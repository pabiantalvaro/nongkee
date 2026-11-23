// ==========================================================================
// nongkee Core Client Application Script
// Resilient, error-guarded, responsive interactions
// ==========================================================================

const stage = document.querySelector('#stage');
const createForm = document.querySelector('#createModal');
const detail = document.querySelector('#modal');
const roomField = document.querySelector('#selectedRoom');
const launch = document.querySelector('#launchMeetBtn');
const createError = document.querySelector('#createError');
const scrim = document.querySelector('#scrim');

let lastTrigger = null;
let detailRequest = null;
let picker = null;
let meetChatTimer = null;
let chatPollTimer = null;
let currentChatFriendId = null;

const chatUrl = stage?.dataset?.chatUrl || '/api/chat/messages/';

function getCsrfToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  if (match) return match[1];
  const input = document.querySelector('input[name="csrfmiddlewaretoken"]');
  return input ? input.value : '';
}

// --------------------------------------------------------------------------
// Modal Management (Detail & Create)
// --------------------------------------------------------------------------
function setModal(name, trigger) {
  if (stage) {
    stage.classList.toggle('open-detail', name === 'detail');
    stage.classList.toggle('open-create', name === 'create');
  }
  if (detail) {
    detail.hidden = name !== 'detail';
  }
  if (createForm) {
    createForm.hidden = name !== 'create';
  }
  if (scrim) {
    scrim.hidden = !name;
  }

  // Focus management
  if (name) {
    lastTrigger = trigger || lastTrigger;
    const focusTarget = document.querySelector(name === 'create' ? '#newTitle' : '#closeDetail');
    try {
      focusTarget?.focus();
    } catch (e) {}
  } else {
    try {
      lastTrigger?.focus();
    } catch (e) {}
    if (new URLSearchParams(location.search).has('meet')) {
      history.replaceState(null, '', location.pathname);
    }
  }

  // Manage live Meet Chat polling inside Meet Detail modal
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
          const txt = input?.value?.trim();
          if (!txt) return;
          const body = new FormData(meetForm);
          if (input) input.value = '';
          try {
            const resp = await fetch(chatUrl, {
              method: 'POST',
              body: body,
              headers: { 'X-CSRFToken': getCsrfToken() },
            });
            if (resp.ok) await pollMeetChat(mid);
          } catch (e) {}
        });
      }
    }
  }
}

// --------------------------------------------------------------------------
// Room Selection & Filter Connecting
// --------------------------------------------------------------------------
function selectRoom(room) {
  if (roomField) roomField.value = room;
  const summaryRoom = document.querySelector('#summaryRoomName');
  if (summaryRoom) summaryRoom.textContent = room || 'Belum dipilih';
  if (launch) launch.disabled = !room;
  document.querySelectorAll('#roomScrollBox [data-room]').forEach(button => {
    const selected = button.dataset.room === room;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });
}

function connectRoomFilters(filters, target, pickerMode = false) {
  if (!filters || !target) return null;
  let pending;
  const read = () => ({
    date: filters.querySelector('select[name="date"]')?.value || '',
    window: filters.querySelector('input[name="window"]:checked')?.value || '',
    building: filters.querySelector('input[name="building"]:checked')?.value || '',
  });

  async function refresh(preselected = '') {
    pending?.abort();
    const request = new AbortController();
    pending = request;
    const current = read();
    const query = new URLSearchParams({ ...current, picker: pickerMode ? '1' : '0' });
    if (pickerMode) {
      selectRoom('');
      const availEl = document.querySelector('#availCount');
      if (availEl) availEl.textContent = '';
    }
    target.textContent = 'Loading rooms…';
    try {
      const roomUrl = stage?.dataset?.roomOptions || '/rooms/options/';
      const response = await fetch(`${roomUrl}?${query}`, { signal: request.signal });
      if (!response.ok) throw new Error('Room lookup failed');
      const html = await response.text();
      if (request.signal.aborted) return;
      target.innerHTML = html;
      if (pickerMode) {
        const available = target.querySelector('[data-available]')?.dataset?.available;
        const availEl = document.querySelector('#availCount');
        if (availEl && available !== undefined) {
          availEl.textContent = `${available} available`;
        }
        if (preselected) {
          const button = [...target.querySelectorAll('[data-room]:enabled')].find(item => item.dataset.room === preselected);
          if (button) selectRoom(preselected);
        }
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

  filters.addEventListener('change', () => refresh(pickerMode ? (roomField?.value || '') : ''));
  return {
    read,
    refresh,
    set(values) {
      if (values.date && filters.querySelector('select')) {
        filters.querySelector('select').value = values.date;
      }
      filters.querySelectorAll('input[type="radio"]').forEach(input => {
        if (values[input.name] !== undefined) {
          input.checked = input.value === values[input.name];
        }
      });
    },
  };
}

function openCreate(trigger, slot, preselected = '') {
  if (!createForm) {
    const params = new URLSearchParams();
    params.set('create', '1');
    if (preselected) params.set('room', preselected);
    location.assign(`/?${params.toString()}`);
    return;
  }
  if (createError) createError.hidden = true;
  if (slot && picker) picker.set(slot);
  detailRequest?.abort();
  setModal('create', trigger);
  picker?.refresh(preselected);
}

// --------------------------------------------------------------------------
// Rooms Directory & Creation Modal Initialization
// --------------------------------------------------------------------------
const directory = document.querySelector('#directoryFilters');
if (directory) {
  const grid = document.querySelector('#roomsGrid');
  if (grid) {
    const filters = connectRoomFilters(directory, grid);
    filters?.refresh();
    grid.addEventListener('click', event => {
      const button = event.target.closest('[data-room-book]');
      if (button) openCreate(button, filters.read(), button.dataset.roomBook);
    });
  }
}

if (createForm) {
  const roomList = document.querySelector('#roomScrollBox');
  const createFilters = document.querySelector('#createFilters');
  if (createFilters && roomList) {
    picker = connectRoomFilters(createFilters, roomList, true);
  }
  roomList?.addEventListener('click', event => {
    const button = event.target.closest('[data-room]:enabled');
    if (button) {
      if (createError) createError.hidden = true;
      selectRoom(button.dataset.room);
    }
  });
  document.querySelector('#openCreateCard')?.addEventListener('click', event => openCreate(event.currentTarget));
  document.querySelector('#closeCreateBtn')?.addEventListener('click', () => setModal());
  createForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (launch && launch.disabled) return;
    if (launch) launch.disabled = true;
    if (createError) createError.hidden = true;
    try {
      const response = await fetch(createForm.action, {
        method: 'POST',
        body: new FormData(createForm),
        headers: { 'X-CSRFToken': getCsrfToken() },
      });
      if (response.redirected) {
        location.assign(response.url);
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        if (createError) {
          createError.textContent = result.error;
          createError.hidden = false;
        }
        if (response.status === 409 && picker) await picker.refresh();
        return;
      }
      location.assign(result.url);
    } catch (error) {
      if (createError) {
        createError.textContent = 'Couldn’t start the meet. Please try again.';
        createError.hidden = false;
      }
    } finally {
      if (launch) launch.disabled = !roomField?.value;
    }
  });
}

// --------------------------------------------------------------------------
// Meet Detail Card Clicks (Global Delegation)
// --------------------------------------------------------------------------
document.addEventListener('click', async event => {
  const card = event.target.closest('[data-detail-url]');
  if (!card || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  const detailBox = document.querySelector('#detailContent');
  if (!detail || !detailBox) return; // Allow normal link navigation if modal not present

  event.preventDefault();
  detailRequest?.abort();
  const request = new AbortController();
  detailRequest = request;
  try {
    const pageVal = stage?.dataset?.page || 'home';
    const query = new URLSearchParams({ page: pageVal });
    const response = await fetch(`${card.dataset.detailUrl}?${query}`, { signal: request.signal });
    if (!response.ok) throw new Error('Meet lookup failed');
    const html = await response.text();
    if (!request.signal.aborted) {
      detailBox.innerHTML = html;
      setModal('detail', card);
      const targetHref = card.dataset.meetHref || card.getAttribute('href');
      if (targetHref) history.replaceState(null, '', targetHref);
    }
  } catch (error) {
    if (!request.signal.aborted) {
      const fallbackHref = card.dataset.meetHref || card.getAttribute('href');
      if (fallbackHref) location.assign(fallbackHref);
    }
  }
});

// Close Detail and Scrim
document.querySelector('#closeDetail')?.addEventListener('click', event => {
  event.preventDefault();
  setModal();
});
document.querySelector('#scrim')?.addEventListener('click', () => {
  setModal();
  closeChat();
});

// Keyboard controls
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (chatDrawer && !chatDrawer.hidden) {
      closeChat();
      return;
    }
    const modal = createForm && !createForm.hidden ? createForm : detail;
    if (modal && !modal.hidden) setModal();
  }
  if (event.key === 'Tab') {
    const modal = createForm && !createForm.hidden ? createForm : detail;
    if (modal && !modal.hidden) {
      const focusable = [...modal.querySelectorAll('a[href], button:enabled, input:enabled, select:enabled')]
        .filter(element => element.tabIndex >= 0 && element.type !== 'hidden' && (element.type !== 'radio' || element.checked));
      if (focusable.length > 0) {
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
    }
  }
});

detail?.addEventListener('submit', event => {
  const prompt = event.target.dataset.confirm;
  if (prompt && !window.confirm(prompt)) event.preventDefault();
});

if (detail && !detail.hidden) setModal('detail');

// --------------------------------------------------------------------------
// Friends Page: Subtabs (Friends Circle vs My Scheduled Meets)
// --------------------------------------------------------------------------
function switchFriendsTab(target) {
  const tabFriendsBtn = document.querySelector('#tabFriendsBtn');
  const tabMeetsBtn = document.querySelector('#tabMeetsBtn');
  const tabFriends = document.querySelector('#tabFriends');
  const tabMeets = document.querySelector('#tabMeets');

  if (target === 'meets') {
    tabMeetsBtn?.classList.add('on');
    tabMeetsBtn?.setAttribute('aria-selected', 'true');
    tabFriendsBtn?.classList.remove('on');
    tabFriendsBtn?.setAttribute('aria-selected', 'false');
    if (tabFriends) tabFriends.hidden = true;
    if (tabMeets) tabMeets.hidden = false;
  } else {
    tabFriendsBtn?.classList.add('on');
    tabFriendsBtn?.setAttribute('aria-selected', 'true');
    tabMeetsBtn?.classList.remove('on');
    tabMeetsBtn?.setAttribute('aria-selected', 'false');
    if (tabFriends) tabFriends.hidden = false;
    if (tabMeets) tabMeets.hidden = true;
  }
}

document.querySelector('#tabFriendsBtn')?.addEventListener('click', () => switchFriendsTab('friends'));
document.querySelector('#tabMeetsBtn')?.addEventListener('click', () => switchFriendsTab('meets'));

document.addEventListener('click', event => {
  const tabBtn = event.target.closest('[data-tab]');
  if (tabBtn) {
    const tabName = tabBtn.dataset.tab;
    if (tabName === 'tabMeets') switchFriendsTab('meets');
    if (tabName === 'tabFriends') switchFriendsTab('friends');
  }
});

// --------------------------------------------------------------------------
// Direct Chat Drawer (1-on-1 Real-Time Chat)
// --------------------------------------------------------------------------
const chatDrawer = document.querySelector('#chatDrawer');
const chatMessagesBox = document.querySelector('#chatMessagesBox');
const chatSendForm = document.querySelector('#chatSendForm');
const chatRecipientId = document.querySelector('#chatRecipientId');
const chatTextInput = document.querySelector('#chatTextInput');
const chatPeerName = document.querySelector('#chatDrawerTitle');
const chatPeerAv = document.querySelector('#chatPeerAv');
const closeChatDrawer = document.querySelector('#closeChatDrawer');

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatChatBubble(msg) {
  const safeName = escapeHtml(msg.sender_name || 'User');
  const safeText = escapeHtml(msg.text || '');
  const safeTime = escapeHtml(msg.time || '');
  return `
    <div class="chat-bubble ${msg.is_me ? 'me' : 'them'}">
      <div class="chat-bubble-author">${safeName}</div>
      <div class="chat-bubble-text">${safeText}</div>
      <div class="chat-bubble-time">${safeTime}</div>
    </div>
  `;
}

function closeChat() {
  if (chatDrawer) {
    chatDrawer.hidden = true;
  }
  currentChatFriendId = null;
  clearInterval(chatPollTimer);
}

closeChatDrawer?.addEventListener('click', closeChat);

async function loadDirectChat(friendId, friendName) {
  currentChatFriendId = friendId;
  if (chatRecipientId) chatRecipientId.value = friendId;
  if (chatPeerName) chatPeerName.textContent = friendName || 'Chat';
  if (chatPeerAv) chatPeerAv.textContent = (friendName || '?')[0].toUpperCase();
  if (chatDrawer) {
    chatDrawer.hidden = false;
  }
  setTimeout(() => chatTextInput?.focus(), 50);

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
  } catch (e) {}
}

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

// Global click handlers for chat, invitations, and modal dismissal
document.addEventListener('click', event => {
  const chatBtn = event.target.closest('[data-chat-user-id]');
  if (chatBtn) {
    const uid = chatBtn.dataset.chatUserId;
    const uname = chatBtn.dataset.chatUserName;
    loadDirectChat(uid, uname);
    return;
  }

  const ajakBtn = event.target.closest('[data-invite-user]');
  if (ajakBtn) {
    const target = ajakBtn.dataset.inviteUser;
    const titleInput = document.querySelector('#newTitle');
    if (titleInput) titleInput.value = `Nongkee bareng @${target}`;
    openCreate(ajakBtn);
    return;
  }

  if (event.target.closest('#closeChatDrawer')) {
    closeChat();
    return;
  }

  if (event.target.closest('#closeDetail, #closeCreateBtn')) {
    setModal();
    return;
  }
});

if (chatSendForm) {
  chatSendForm.addEventListener('submit', async event => {
    event.preventDefault();
    const text = chatTextInput?.value?.trim();
    if (!text || !currentChatFriendId) return;

    const body = new FormData(chatSendForm);
    if (chatTextInput) chatTextInput.value = '';

    try {
      const res = await fetch(chatUrl, {
        method: 'POST',
        body: body,
        headers: { 'X-CSRFToken': getCsrfToken() },
      });
      if (res.ok) {
        await pollDirectChat();
      }
    } catch (e) {}
  });
}

// --------------------------------------------------------------------------
// Client-side Auth Hydrator (for static Firebase Hosting on nongkee.web.app)
// --------------------------------------------------------------------------
function initClientAuth() {
  const isStatic = window.location.hostname.includes('web.app') || window.location.hostname.includes('firebaseapp.com') || window.location.protocol === 'file:';
  const raw = localStorage.getItem('nongkee_auth_user');
  if (isStatic && raw) {
    try {
      const user = JSON.parse(raw);
      const whoEl = document.querySelector('header .who');
      const avEl = document.querySelector('header .me-av');
      if (whoEl) {
        whoEl.innerHTML = `
          <b>${user.name || user.username}</b>
          <button type="button" class="text-button" id="clientLogoutBtn" style="margin-left: 8px;">Sign out</button>
        `;
        document.querySelector('#clientLogoutBtn')?.addEventListener('click', () => {
          localStorage.removeItem('nongkee_auth_user');
          location.reload();
        });
      }
      if (avEl) {
        avEl.textContent = (user.name || user.username || '?')[0].toUpperCase();
      }
    } catch (e) {}
  }
}

document.addEventListener('DOMContentLoaded', initClientAuth);
initClientAuth();
