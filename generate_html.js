const fs = require('fs');
const path = require('path');

const slots = JSON.parse(fs.readFileSync(path.join(__dirname, 'schedule_slots.json'), 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Katalog Kelas Kosong UI</title>
  <style>
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #f59e0b;
      --primary-hover: #d97706;
      --primary-soft: #fef3c7;
      --success: #10b981;
      --success-soft: #d1fae5;
      --danger: #ef4444;
      --danger-soft: #fee2e2;
      --radius: 12px;
      --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-hover: 0 6px 16px rgba(0,0,0,0.08);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 16px;
    }

    .wrapper {
      max-width: 1100px;
      margin: 0 auto;
    }

    /* Header */
    header {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: var(--shadow);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .title-area h1 {
      font-size: 1.35rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ui-tag {
      background: #fde047;
      color: #713f12;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }

    .title-area p {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-top: 2px;
    }

    /* Controls / Filters */
    .controls {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px;
      margin-bottom: 16px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .control-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }

    .row-label {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      min-width: 70px;
    }

    .btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .pill-btn {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .pill-btn:hover {
      border-color: var(--primary);
    }

    .pill-btn.active {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }

    /* Time inputs & Search */
    .inputs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      padding-top: 8px;
      border-top: 1px dashed var(--border);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    input, select {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      font-family: inherit;
      font-size: 0.9rem;
      padding: 8px 12px;
      border-radius: 8px;
      outline: none;
      transition: border 0.15s;
    }

    input:focus, select:focus {
      border-color: var(--primary);
      background: #fff;
    }

    /* Status Banner / Summary */
    .summary-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 16px;
      padding: 0 4px;
    }

    .stats {
      font-size: 0.95rem;
      font-weight: 700;
    }

    .stat-free {
      color: var(--success);
    }

    .stat-busy {
      color: var(--danger);
    }

    .tab-filters {
      display: flex;
      gap: 6px;
    }

    .tab-btn {
      background: var(--card-bg);
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-family: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
    }

    .tab-btn.active {
      background: var(--text);
      color: #fff;
      border-color: var(--text);
    }

    /* Cards Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 14px;
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      box-shadow: var(--shadow);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }

    .card.free {
      border-left: 5px solid var(--success);
    }

    .card.busy {
      border-left: 5px solid var(--danger);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 10px;
    }

    .room-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text);
    }

    .badge {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 9999px;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .badge.free {
      background: var(--success-soft);
      color: var(--success);
    }

    .badge.busy {
      background: var(--danger-soft);
      color: var(--danger);
    }

    .card-body {
      font-size: 0.85rem;
    }

    .busy-info {
      background: var(--bg);
      border-radius: 8px;
      padding: 10px;
      margin-top: 6px;
    }

    .course-name {
      font-weight: 700;
      color: var(--text);
      font-size: 0.875rem;
    }

    .busy-time {
      color: var(--danger);
      font-weight: 700;
      font-size: 0.8rem;
      margin-top: 2px;
    }

    .lecturer {
      color: var(--text-muted);
      font-size: 0.775rem;
      margin-top: 4px;
    }

    .free-info {
      color: var(--success);
      font-weight: 600;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 0;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 48px 16px;
      background: var(--card-bg);
      border: 1px dashed var(--border);
      border-radius: var(--radius);
      color: var(--text-muted);
    }

    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      .controls {
        padding: 14px;
      }
      .row-label {
        width: 100%;
        margin-bottom: 2px;
      }
    }
  </style>
</head>
<body>

  <div class="wrapper">
    <!-- Header -->
    <header>
      <div class="title-area">
        <h1><span class="ui-tag">UI</span> Katalog Kelas Kosong</h1>
        <p>Cek ketersediaan ruangan kelas & lab secara realtime (Term 1 2026/2027)</p>
      </div>
    </header>

    <!-- Controls -->
    <section class="controls">
      <!-- Day selector -->
      <div class="control-row">
        <span class="row-label">Hari</span>
        <div class="btn-group" id="dayGroup">
          <button class="pill-btn" data-day="Senin">Senin</button>
          <button class="pill-btn active" data-day="Selasa">Selasa</button>
          <button class="pill-btn" data-day="Rabu">Rabu</button>
          <button class="pill-btn" data-day="Kamis">Kamis</button>
          <button class="pill-btn" data-day="Jumat">Jumat</button>
          <button class="pill-btn" data-day="Sabtu">Sabtu</button>
        </div>
      </div>

      <!-- Quick time slot presets -->
      <div class="control-row">
        <span class="row-label">Waktu</span>
        <div class="btn-group" id="timePresets">
          <button class="pill-btn" data-start="08:00" data-end="10:00">08:00 - 10:00</button>
          <button class="pill-btn active" data-start="10:00" data-end="12:00">10:00 - 12:00</button>
          <button class="pill-btn" data-start="13:00" data-end="15:00">13:00 - 15:00</button>
          <button class="pill-btn" data-start="15:00" data-end="17:00">15:00 - 17:00</button>
        </div>
      </div>

      <!-- Building filter pills -->
      <div class="control-row">
        <span class="row-label">Lokasi</span>
        <div class="btn-group" id="buildingGroup">
          <button class="pill-btn active" data-building="Ged Baru">Gedung Baru</button>
          <button class="pill-btn" data-building="Gd Lama">Gedung Lama</button>
          <button class="pill-btn" data-building="Lab">Laboratorium</button>
          <button class="pill-btn" data-building="">Semua Ruangan</button>
        </div>
      </div>

      <!-- Inputs for custom time & search -->
      <div class="inputs-grid">
        <div class="field">
          <label>Jam Mulai</label>
          <input type="time" id="startTime" value="10:00">
        </div>
        <div class="field">
          <label>Jam Selesai</label>
          <input type="time" id="endTime" value="12:00">
        </div>
        <div class="field">
          <label>Cari Nama Ruangan</label>
          <input type="text" id="searchInput" placeholder="Ketik kode ruang (misal: A6.10, 1105)...">
        </div>
      </div>
    </section>

    <!-- Summary & View filter -->
    <div class="summary-bar">
      <div class="stats">
        <span class="stat-free" id="statFree">0</span> Ruangan Kosong &nbsp;•&nbsp; 
        <span class="stat-busy" id="statBusy">0</span> Terpakai
      </div>

      <div class="tab-filters">
        <button class="tab-btn active" data-tab="all">Semua (<span id="countAll">0</span>)</button>
        <button class="tab-btn" data-tab="free">Kosong (<span id="countFree">0</span>)</button>
        <button class="tab-btn" data-tab="busy">Terpakai (<span id="countBusy">0</span>)</button>
      </div>
    </div>

    <!-- Cards Grid -->
    <main class="grid" id="roomGrid"></main>
  </div>

  <!-- Embedded Data (Offline & Local friendly, no CORS issues) -->
  <script>
    const scheduleSlots = ${JSON.stringify(slots)};
    const knownRooms = [...new Set(scheduleSlots.map(s => s.room))].sort();

    let currentDay = 'Selasa';
    let currentBuilding = 'Ged Baru';
    let currentTab = 'all';

    function toMinutes(timeStr) {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    }

    function isOverlapping(s1, e1, s2, e2) {
      return Math.max(toMinutes(s1), toMinutes(s2)) < Math.min(toMinutes(e1), toMinutes(e2));
    }

    function render() {
      const start = document.getElementById('startTime').value;
      const end = document.getElementById('endTime').value;
      const search = document.getElementById('searchInput').value.trim().toLowerCase();

      // Find occupied rooms for this day and time
      const occupied = new Map();
      for (const slot of scheduleSlots) {
        if (slot.day.toLowerCase() === currentDay.toLowerCase()) {
          if (isOverlapping(start, end, slot.start_time, slot.end_time)) {
            occupied.set(slot.room, slot);
          }
        }
      }

      // Filter rooms list
      let filtered = knownRooms;
      if (currentBuilding) {
        filtered = filtered.filter(r => r.toLowerCase().includes(currentBuilding.toLowerCase()));
      }
      if (search) {
        filtered = filtered.filter(r => r.toLowerCase().includes(search));
      }

      const freeRooms = [];
      const busyRooms = [];

      for (const room of filtered) {
        if (occupied.has(room)) {
          busyRooms.push({ room, slot: occupied.get(room) });
        } else {
          freeRooms.push({ room });
        }
      }

      // Update counters
      document.getElementById('statFree').textContent = freeRooms.length;
      document.getElementById('statBusy').textContent = busyRooms.length;
      document.getElementById('countAll').textContent = filtered.length;
      document.getElementById('countFree').textContent = freeRooms.length;
      document.getElementById('countBusy').textContent = busyRooms.length;

      // Select items according to tab
      let displayItems = [];
      if (currentTab === 'free') displayItems = freeRooms;
      else if (currentTab === 'busy') displayItems = busyRooms;
      else displayItems = [...freeRooms, ...busyRooms].sort((a, b) => a.room.localeCompare(b.room));

      const grid = document.getElementById('roomGrid');
      grid.innerHTML = '';

      if (displayItems.length === 0) {
        grid.innerHTML = \`
          <div class="empty-state">
            Tidak ada ruangan yang cocok dengan kriteria filter saat ini.
          </div>
        \`;
        return;
      }

      for (const item of displayItems) {
        const isBusy = !!item.slot;
        const card = document.createElement('div');
        card.className = \`card \${isBusy ? 'busy' : 'free'}\`;
        card.innerHTML = \`
          <div class="card-top">
            <div class="room-title">\${item.room}</div>
            <span class="badge \${isBusy ? 'busy' : 'free'}">\${isBusy ? 'Terpakai' : 'Kosong'}</span>
          </div>
          <div class="card-body">
            \${isBusy ? \`
              <div class="busy-info">
                <div class="course-name">\${item.slot.course_name} (\${item.slot.class_name})</div>
                <div class="busy-time">⏰ \${item.slot.start_time} - \${item.slot.end_time}</div>
                <div class="lecturer">\${item.slot.lecturers.join(', ') || '-'}</div>
              </div>
            \` : \`
              <div class="free-info">
                <span>✓</span> Bebas digunakan (\${start} - \${end})
              </div>
            \`}
          </div>
        \`;
        grid.appendChild(card);
      }
    }

    // Day buttons click
    document.querySelectorAll('#dayGroup .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#dayGroup .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDay = btn.dataset.day;
        render();
      });
    });

    // Time presets click
    document.querySelectorAll('#timePresets .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#timePresets .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('startTime').value = btn.dataset.start;
        document.getElementById('endTime').value = btn.dataset.end;
        render();
      });
    });

    // Building filter click
    document.querySelectorAll('#buildingGroup .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#buildingGroup .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBuilding = btn.dataset.building;
        render();
      });
    });

    // Custom time & search inputs
    ['startTime', 'endTime'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        document.querySelectorAll('#timePresets .pill-btn').forEach(b => b.classList.remove('active'));
        render();
      });
    });
    document.getElementById('searchInput').addEventListener('input', render);

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;
        render();
      });
    });

    // Initial render
    render();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('Successfully generated standalone index.html with embedded schedule data!');
