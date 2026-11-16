const stage = document.querySelector('#stage');
const createForm = document.querySelector('#createModal');
const detail = document.querySelector('#modal');
const roomField = document.querySelector('#selectedRoom');
const launch = document.querySelector('#launchMeetBtn');
const createError = document.querySelector('#createError');
let lastTrigger;
let detailRequest;

function setModal(name, trigger) {
  stage.classList.toggle('open-detail', name === 'detail');
  stage.classList.toggle('open-create', name === 'create');
  detail.hidden = name !== 'detail';
  if (createForm) createForm.hidden = name !== 'create';
  stage.querySelectorAll('header, nav, main').forEach(element => { element.inert = Boolean(name); });
  if (name) {
    lastTrigger = trigger;
    document.querySelector(name === 'create' ? '#newTitle' : '#closeDetail').focus();
  } else {
    lastTrigger?.focus();
    if (new URLSearchParams(location.search).has('meet')) history.replaceState(null, '', location.pathname);
  }
}

function selectRoom(room) {
  roomField.value = room;
  document.querySelector('#summaryRoomName').textContent = room || 'Belum dipilih';
  launch.disabled = !room;
  document.querySelectorAll('#roomScrollBox [data-room]').forEach(button => {
    const selected = button.dataset.room === room;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });
}

function connectRoomFilters(filters, target, picker = false) {
  let pending;
  const read = () => ({
    date: filters.querySelector('select[name="date"]').value,
    window: filters.querySelector('input[name="window"]:checked').value,
    building: filters.querySelector('input[name="building"]:checked').value,
  });

  async function refresh(preselected = '') {
    pending?.abort();
    const request = new AbortController();
    pending = request;
    const query = new URLSearchParams({ ...read(), picker: picker ? '1' : '0' });
    if (picker) {
      selectRoom('');
      document.querySelector('#availCount').textContent = '';
    }
    target.textContent = 'Loading rooms…';
    try {
      const response = await fetch(`${stage.dataset.roomOptions}?${query}`, { signal: request.signal });
      if (!response.ok) throw new Error('Room lookup failed');
      const html = await response.text();
      if (request.signal.aborted) return;
      target.innerHTML = html;
      if (picker) {
        const available = target.querySelector('[data-available]').dataset.available;
        document.querySelector('#availCount').textContent = `${available} available`;
        const button = [...target.querySelectorAll('[data-room]:enabled')].find(item => item.dataset.room === preselected);
        if (button) selectRoom(preselected);
      }
    } catch (error) {
      if (!request.signal.aborted) {
        target.textContent = 'Couldn’t load rooms. ';
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'mini-pill';
        retry.textContent = 'Retry';
        retry.addEventListener('click', () => refresh(preselected));
        target.append(retry);
      }
    }
  }

  filters.addEventListener('change', () => refresh(picker ? roomField.value : ''));
  return {
    read,
    refresh,
    set(values) {
      filters.querySelector('select').value = values.date;
      filters.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = input.value === values[input.name]; });
    },
  };
}

let picker;
function openCreate(trigger, slot, preselected = '') {
  createError.hidden = true;
  if (slot) picker.set(slot);
  detailRequest?.abort();
  setModal('create', trigger);
  picker.refresh(preselected);
}

const directory = document.querySelector('#directoryFilters');
if (directory) {
  const grid = document.querySelector('#roomsGrid');
  const filters = connectRoomFilters(directory, grid);
  filters.refresh();
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-room-book]');
    if (button) openCreate(button, filters.read(), button.dataset.roomBook);
  });
}

if (createForm) {
  const roomList = document.querySelector('#roomScrollBox');
  picker = connectRoomFilters(document.querySelector('#createFilters'), roomList, true);
  roomList.addEventListener('click', event => {
    const button = event.target.closest('[data-room]:enabled');
    if (button) {
      createError.hidden = true;
      selectRoom(button.dataset.room);
    }
  });
  document.querySelector('#openCreateCard')?.addEventListener('click', event => openCreate(event.currentTarget));
  document.querySelector('#closeCreateBtn').addEventListener('click', () => setModal());
  createForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (launch.disabled) return;
    launch.disabled = true;
    createError.hidden = true;
    try {
      const response = await fetch(createForm.action, { method: 'POST', body: new FormData(createForm) });
      if (response.redirected) {
        location.assign(response.url);
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        createError.textContent = result.error;
        createError.hidden = false;
        if (response.status === 409) await picker.refresh();
        return;
      }
      location.assign(result.url);
    } catch (error) {
      createError.textContent = 'Couldn’t start the meet. Please try again.';
      createError.hidden = false;
    } finally {
      launch.disabled = !roomField.value;
    }
  });
}

document.querySelector('#grid')?.addEventListener('click', async event => {
  const card = event.target.closest('[data-detail-url]');
  if (!card || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  detailRequest?.abort();
  const request = new AbortController();
  detailRequest = request;
  try {
    const query = new URLSearchParams({ page: stage.dataset.page });
    const response = await fetch(`${card.dataset.detailUrl}?${query}`, { signal: request.signal });
    if (!response.ok) throw new Error('Meet lookup failed');
    const html = await response.text();
    if (!request.signal.aborted) {
      document.querySelector('#detailContent').innerHTML = html;
      setModal('detail', card);
      history.replaceState(null, '', card.href);
    }
  } catch (error) {
    if (!request.signal.aborted) location.assign(card.href);
  }
});

document.querySelector('#closeDetail').addEventListener('click', event => {
  event.preventDefault();
  setModal();
});
document.querySelector('#scrim').addEventListener('click', () => setModal());
document.addEventListener('keydown', event => {
  const modal = createForm && !createForm.hidden ? createForm : detail;
  if (modal.hidden) return;
  if (event.key === 'Escape') setModal();
  if (event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('a[href], button:enabled, input:enabled, select:enabled')]
      .filter(element => element.tabIndex >= 0 && element.type !== 'hidden' && (element.type !== 'radio' || element.checked));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
detail.addEventListener('submit', event => {
  const prompt = event.target.dataset.confirm;
  if (prompt && !window.confirm(prompt)) event.preventDefault();
});
if (!detail.hidden) setModal('detail');

// ================= FRIENDS PAGE & CHAT SYSTEM =================
const chatUrl = stage?.dataset?.chatUrl || '/api/chat/messages/';
let chatPollTimer = null;
let currentChatFriendId = null;
let currentMeetId = null;

// Tab switcher on Friends Page
const tabFriendsBtn = document.querySelector('#tabFriendsBtn');
const tabMeetsBtn = document.querySelector('#tabMeetsBtn');
const tabFriends = document.querySelector('#tabFriends');
const tabMeets = document.querySelector('#tabMeets');

if (tabFriendsBtn && tabMeetsBtn) {
  tabFriendsBtn.addEventListener('click', () => {
    tabFriendsBtn.classList.add('on');
    tabFriendsBtn.setAttribute('aria-selected', 'true');
    tabMeetsBtn.classList.remove('on');
    tabMeetsBtn.setAttribute('aria-selected', 'false');
    if (tabFriends) tabFriends.hidden = false;
    if (tabMeets) tabMeets.hidden = true;
  });

  tabMeetsBtn.addEventListener('click', () => {
    tabMeetsBtn.classList.add('on');
    tabMeetsBtn.setAttribute('aria-selected', 'true');
    tabFriendsBtn.classList.remove('on');
    tabFriendsBtn.setAttribute('aria-selected', 'false');
    if (tabFriends) tabFriends.hidden = true;
    if (tabMeets) tabMeets.hidden = false;
  });
}

// Direct Chat Drawer
const chatDrawer = document.querySelector('#chatDrawer');
const chatMessagesBox = document.querySelector('#chatMessagesBox');
const chatSendForm = document.querySelector('#chatSendForm');
const chatRecipientId = document.querySelector('#chatRecipientId');
const chatTextInput = document.querySelector('#chatTextInput');
const chatPeerName = document.querySelector('#chatDrawerTitle');
const chatPeerAv = document.querySelector('#chatPeerAv');
const closeChatDrawer = document.querySelector('#closeChatDrawer');

function formatChatBubble(msg) {
  return `
    <div class="chat-bubble ${msg.is_me ? 'me' : 'them'}">
      <div class="chat-bubble-author">${msg.sender_name}</div>
      <div class="chat-bubble-text">${msg.text}</div>
      <div class="chat-bubble-time">${msg.time}</div>
    </div>
  `;
}

async function loadDirectChat(friendId, friendName) {
  currentChatFriendId = friendId;
  if (chatRecipientId) chatRecipientId.value = friendId;
  if (chatPeerName) chatPeerName.textContent = friendName || 'Chat';
  if (chatPeerAv) chatPeerAv.textContent = (friendName || '?')[0].toUpperCase();
  if (chatDrawer) chatDrawer.hidden = false;
  if (chatTextInput) chatTextInput.focus();

  await pollDirectChat();
  clearInterval(chatPollTimer);
  chatPollTimer = setInterval(pollDirectChat, 2500);
}

async function pollDirectChat() {
  if (!currentChatFriendId || !chatMessagesBox) return;
  try {
    const res = await fetch(`${chatUrl}?friend=${currentChatFriendId}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.messages && data.messages.length > 0) {
      chatMessagesBox.innerHTML = data.messages.map(formatChatBubble).join('');
      chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    } else {
      chatMessagesBox.innerHTML = '<div class="chat-empty-msg">No messages yet. Say hello!</div>';
    }
  } catch (e) {
    // silently catch network poll errors
  }
}

if (closeChatDrawer) {
  closeChatDrawer.addEventListener('click', () => {
    if (chatDrawer) chatDrawer.hidden = true;
    currentChatFriendId = null;
    clearInterval(chatPollTimer);
  });
}

document.addEventListener('click', event => {
  const chatBtn = event.target.closest('[data-chat-user-id]');
  if (chatBtn) {
    const uid = chatBtn.dataset.chatUserId;
    const uname = chatBtn.dataset.chatUserName;
    loadDirectChat(uid, uname);
  }

  const ajakBtn = event.target.closest('[data-invite-user]');
  if (ajakBtn) {
    const target = ajakBtn.dataset.inviteUser;
    const titleInput = document.querySelector('#newTitle');
    if (titleInput) titleInput.value = `Nongkee bareng @${target}`;
    openCreate(ajakBtn);
  }
});

if (chatSendForm) {
  chatSendForm.addEventListener('submit', async event => {
    event.preventDefault();
    const text = chatTextInput.value.trim();
    if (!text || !currentChatFriendId) return;

    const body = new FormData(chatSendForm);
    chatTextInput.value = '';

    try {
      const res = await fetch(chatUrl, { method: 'POST', body: body });
      if (res.ok) {
        await pollDirectChat();
      }
    } catch (e) {}
  });
}

// Meet Chat logic inside Meet Detail modal
let meetChatTimer = null;

async function pollMeetChat(meetId) {
  const box = document.querySelector('#meetChatBox');
  if (!box || !meetId) return;
  try {
    const res = await fetch(`${chatUrl}?meet=${meetId}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.messages && data.messages.length > 0) {
      box.innerHTML = data.messages.map(formatChatBubble).join('');
      box.scrollTop = box.scrollHeight;
    } else {
      box.innerHTML = '<div class="chat-empty-msg">No messages yet. Say hi to fellow nongkeers!</div>';
    }
  } catch (e) {}
}

const originalSetModal = setModal;
setModal = function(name, trigger) {
  originalSetModal(name, trigger);
  clearInterval(meetChatTimer);
  if (name === 'detail') {
    const meetBox = document.querySelector('.meet-chat-section');
    if (meetBox && meetBox.dataset.meetId) {
      const mid = meetBox.dataset.meetId;
      pollMeetChat(mid);
      meetChatTimer = setInterval(() => pollMeetChat(mid), 2500);

      const meetForm = document.querySelector('#meetChatForm');
      if (meetForm && !meetForm._bound) {
        meetForm._bound = true;
        meetForm.addEventListener('submit', async ev => {
          ev.preventDefault();
          const input = meetForm.querySelector('.meet-chat-input');
          const txt = input.value.trim();
          if (!txt) return;
          const body = new FormData(meetForm);
          input.value = '';
          try {
            const resp = await fetch(chatUrl, { method: 'POST', body: body });
            if (resp.ok) await pollMeetChat(mid);
          } catch (e) {}
        });
      }
    }
  }
};

