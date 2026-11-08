const fs = require('fs');
const path = require('path');

const slots = JSON.parse(fs.readFileSync(path.join(__dirname, 'schedule_slots.json'), 'utf8'));
const academicRooms = [...new Set(slots.map(s => s.room))].sort();

const casualSpots = [
  "Kantin Pacil",
  "Stulo 1",
  "Stulo 2",
  "Selasar Gd Baru",
  "Perpus Pacil Lt. 2",
  "Taman Pacil",
  "Selasar Gd Lama"
];

// 1. DATA_CLASSES.JSON
const dataClasses = {
  schedule_slots: slots,
  casual_spots: casualSpots,
  academic_rooms: academicRooms
};
fs.writeFileSync(path.join(__dirname, 'data_classes.json'), JSON.stringify(dataClasses, null, 2), 'utf8');
console.log('Created data_classes.json');

// 2. DATA_USERS.JSON
const dataUsers = {
  currentUser: {
    id: "bian",
    username: "bian/varo",
    fullName: "Fabian Alvaro Muhammad",
    displayName: "Fabian Alvaro (bian/varo)",
    npm: "2606859093",
    tag: "26/Zenith | CS",
    cohort: "cs.26",
    avatar: "avatars/avatar_bian.png"
  },
  avatars: {
    abizar: "avatars/avatar_abizar.png",
    ajen: "avatars/avatar_ajen.png",
    benishere: "avatars/avatar_benishere.png",
    benishere565: "avatars/avatar_benishere.png",
    bian: "avatars/avatar_bian.png",
    varo: "avatars/avatar_bian.png",
    me: "avatars/avatar_bian.png",
    binar: "avatars/avatar_binar.png",
    cindireulla: "avatars/avatar_cindireulla.png",
    ezar: "avatars/avatar_ezar.png",
    fiqhi: "avatars/avatar_fiqhi.png",
    hana: "avatars/avatar_hana.png",
    cryinfairys: "avatars/avatar_hana.png",
    imanuel: "avatars/avatar_imanuel.png",
    jonathan: "avatars/avatar_jonathan.png",
    kejambreet: "avatars/avatar_kejambreet.png",
    maiza: "avatars/avatar_maiza.png",
    misha: "avatars/avatar_misha.png",
    nami: "avatars/avatar_nami.png",
    nina: "avatars/avatar_nina.png",
    torikararamyon: "avatars/avatar_nina.png",
    nonapacil: "avatars/avatar_nonapacil.png",
    peypuy: "avatars/avatar_peypuy.png",
    rafif: "avatars/avatar_rafif.png",
    setip: "avatars/avatar_setip.png",
    thealpharaoh: "avatars/avatar_thealpharaoh.png"
  },
  friends: [
    {
      id: "nonapacil",
      name: "nonapacil",
      tag: "si.26",
      av: "nonapacil",
      schedule: {
        "08:30": { status: "in_class", course: "Dasar-Dasar Pemrograman 1", room: "Lab A1.01", time: "08:00 - 10:40" },
        "09:41": { status: "in_class", course: "Dasar-Dasar Pemrograman 1", room: "Lab A1.01", time: "08:00 - 10:40" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Nongkee bareng anak SI" },
        "13:30": { status: "in_class", course: "Matematika Diskret 1", room: "A6.10 (Ged Baru)", time: "13:00 - 14:40" },
        "15:45": { status: "free", spot: "Stulo 1", note: "Nugas DDP" }
      }
    },
    {
      id: "imanuel",
      name: "imanuel",
      tag: "cs.26",
      av: "imanuel",
      schedule: {
        "08:30": { status: "in_class", course: "Basis Data (BasDat A)", room: "A6.07 (Ged Baru)", time: "08:00 - 10:30" },
        "09:41": { status: "in_class", course: "Basis Data (BasDat A)", room: "A6.07 (Ged Baru)", time: "08:00 - 10:30" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Makan siang" },
        "13:30": { status: "free", spot: "Lab A1.01", note: "Ngulik backend Django" },
        "15:45": { status: "in_class", course: "Aljabar Linier", room: "A6.10 (Ged Baru)", time: "15:00 - 15:50" }
      }
    },
    {
      id: "maiza",
      name: "maiza",
      tag: "cs.26",
      av: "maiza",
      schedule: {
        "08:30": { status: "free", spot: "Perpus Pacil Lt. 2", note: "Ngerjain tugas mandiri" },
        "09:41": { status: "free", spot: "Perpus Pacil Lt. 2", note: "Belajar Alin" },
        "11:30": { status: "free", spot: "Stulo 1", note: "Kumpul tim Django" },
        "13:30": { status: "in_class", course: "Aljabar Linier (Alin B)", room: "A6.10 (Ged Baru)", time: "13:00 - 13:50" },
        "15:45": { status: "free", spot: "Taman Pacil", note: "Chill sore" }
      }
    },
    {
      id: "kejambreet",
      name: "kejambreet",
      tag: "cs.26",
      av: "kejambreet",
      schedule: {
        "08:30": { status: "in_class", course: "Basis Data (BasDat A)", room: "A6.07 (Ged Baru)", time: "08:00 - 10:30" },
        "09:41": { status: "in_class", course: "Basis Data (BasDat A)", room: "A6.07 (Ged Baru)", time: "08:00 - 10:30" },
        "11:30": { status: "free", spot: "Stulo 2", note: "Review ERD BasDat" },
        "13:30": { status: "free", spot: "Selasar Gd Baru", note: "Ngobrol santai" },
        "15:45": { status: "in_class", course: "Aljabar Linier", room: "A6.10 (Ged Baru)", time: "15:00 - 15:50" }
      }
    },
    {
      id: "cryinfairys",
      name: "cryinfairys",
      tag: "cs.26",
      av: "cryinfairys",
      schedule: {
        "08:30": { status: "free", spot: "Stulo 1", note: "Review materi Manbis" },
        "09:41": { status: "free", spot: "Stulo 1", note: "MANBIS OMAIGAT meet" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Makan siang" },
        "13:30": { status: "in_class", course: "Aljabar Linier", room: "A6.08 (Ged Baru)", time: "13:00 - 14:40" },
        "15:45": { status: "free", spot: "Selasar Gd Lama", note: "Nongkrong sore" }
      }
    },
    {
      id: "cindireulla",
      name: "cindireulla",
      tag: "cs.26",
      av: "cindireulla",
      schedule: {
        "08:30": { status: "in_class", course: "Pemrograman Berbasis Platform", room: "A5.51 (Ged Baru)", time: "08:00 - 10:30" },
        "09:41": { status: "in_class", course: "Pemrograman Berbasis Platform", room: "A5.51 (Ged Baru)", time: "08:00 - 10:30" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Stress pbp sprint" },
        "13:30": { status: "free", spot: "Lab A1.01", note: "Lanjut coding sprint" },
        "15:45": { status: "free", spot: "Stulo 2", note: "Diskusi PR" }
      }
    },
    {
      id: "thealpharaoh",
      name: "thealpharaoh",
      tag: "cs.26",
      av: "thealpharaoh",
      schedule: {
        "08:30": { status: "free", spot: "Selasar Gd Baru", note: "Dance practice setup" },
        "09:41": { status: "free", spot: "A5.51 (Ged Baru)", note: "Audisi ZELLASEYE" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Lunch break" },
        "13:30": { status: "in_class", course: "Aljabar Linier", room: "A6.09 (Ged Baru)", time: "13:00 - 14:40" },
        "15:45": { status: "free", spot: "Selasar Gd Baru", note: "Evaluation session" }
      }
    },
    {
      id: "ajen",
      name: "ajen",
      tag: "cs.26",
      av: "ajen",
      schedule: {
        "08:30": { status: "in_class", course: "Analisis Numerik", room: "A1.10 (Ged Lama)", time: "08:00 - 10:30" },
        "09:41": { status: "in_class", course: "Analisis Numerik", room: "A1.10 (Ged Lama)", time: "08:00 - 10:30" },
        "11:30": { status: "free", spot: "Stulo 1", note: "Stress bareng Rafif & Jo" },
        "13:30": { status: "free", spot: "Kantin Pacil", note: "Makan siang" },
        "15:45": { status: "free", spot: "Perpus Pacil Lt. 2", note: "Revisi kodingan Anum" }
      }
    },
    {
      id: "benishere",
      name: "benishere",
      tag: "cs.26",
      av: "benishere",
      schedule: {
        "08:30": { status: "free", spot: "Selasar Gd Baru", note: "Brainstorming konsep game" },
        "09:41": { status: "free", spot: "Selasar Gd Baru", note: "Game prototype testing" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Lunch with Abizar" },
        "13:30": { status: "in_class", course: "Sistem Operasi", room: "A6.09 (Ged Baru)", time: "13:00 - 14:40" },
        "15:45": { status: "free", spot: "Lab A1.01", note: "Godot Engine sprint" }
      }
    },
    {
      id: "nina",
      name: "nina",
      tag: "ilpus.26",
      av: "nina",
      schedule: {
        "08:30": { status: "free", spot: "Kantin Pacil", note: "Numpang wifi pacil" },
        "09:41": { status: "free", spot: "Kantin Pacil", note: "Numpang nugas di pacil" },
        "11:30": { status: "free", spot: "Kantin Pacil", note: "Jajan es teh kantin" },
        "13:30": { status: "in_class", course: "Pengantar Ilmu Informasi", room: "Ged FIB 1.1", time: "13:00 - 15:30" },
        "15:45": { status: "free", spot: "Perpus Pacil Lt. 2", note: "Balik ke pacil lagi" }
      }
    }
  ]
};
fs.writeFileSync(path.join(__dirname, 'data_users.json'), JSON.stringify(dataUsers, null, 2), 'utf8');
console.log('Created data_users.json');

// 3. DATA_MEETS.JSON
const dataMeets = [
  {
    id: "django",
    title: "Django Discussion",
    openedBy: "imanuel",
    hostAv: "imanuel",
    hostTag: "cs.26",
    avatars: ["imanuel", "maiza", "me"],
    attendees: [
      { id: "maiza", name: "maiza", tag: "cs.26", av: "maiza" },
      { id: "me", name: "bian/varo", tag: "cs.26", av: "me", isMe: true }
    ],
    tags: ["WebDev", "Lab A1.01"],
    mine: true
  },
  {
    id: "basdat",
    title: "BasDat study",
    openedBy: "kejambreet",
    hostAv: "kejambreet",
    hostTag: "cs.26",
    avatars: ["kejambreet", "fiqhi", "setip"],
    attendees: [
      { id: "fiqhi", name: "fiqhi", tag: "cs.26", av: "fiqhi" },
      { id: "setip", name: "setip", tag: "cs.26", av: "setip" }
    ],
    tags: ["Pacillian Studies", "A6.07 (Ged Baru)"],
    mine: false
  },
  {
    id: "manbis",
    title: "MANBIS OMAIGAT",
    openedBy: "cryinfairys",
    hostAv: "cryinfairys",
    hostTag: "cs.26",
    avatars: ["cryinfairys", "nonapacil", "peypuy"],
    attendees: [
      { id: "nonapacil", name: "nonapacil", tag: "si.26", av: "nonapacil" },
      { id: "peypuy", name: "peypuy", tag: "cs.26", av: "peypuy" }
    ],
    tags: ["MANBIS", "Stulo 1"],
    mine: false
  },
  {
    id: "stress",
    title: "stress anum",
    openedBy: "ajen",
    hostAv: "ajen",
    hostTag: "cs.26",
    avatars: ["ajen", "rafif", "jonathan"],
    attendees: [
      { id: "rafif", name: "rafif", tag: "cs.26", av: "rafif" },
      { id: "jonathan", name: "jonathan", tag: "cs.26", av: "jonathan" }
    ],
    tags: ["Pacillian Studies", "A1.10 (Ged Lama)"],
    mine: false
  },
  {
    id: "audi",
    title: "audition for ZELLASEYE 💜",
    openedBy: "thealpharaoh",
    hostAv: "thealpharaoh",
    hostTag: "cs.26",
    avatars: ["thealpharaoh", "binar", "misha"],
    attendees: [
      { id: "binar", name: "binar", tag: "cs.26", av: "binar" },
      { id: "misha", name: "misha", tag: "cs.26", av: "misha" }
    ],
    tags: ["Casual", "A5.51 (Ged Baru)"],
    mine: false
  },
  {
    id: "ilpus",
    title: "ilpus numpang di pacil <3",
    openedBy: "nina",
    hostAv: "nina",
    hostTag: "ilpus.26",
    avatars: ["nina"],
    attendees: [],
    tags: ["Casual", "Kantin Pacil"],
    mine: false
  },
  {
    id: "pbp",
    title: "pbp ya allah",
    openedBy: "cindireulla",
    hostAv: "cindireulla",
    hostTag: "cs.26",
    avatars: ["cindireulla", "ezar", "nami"],
    attendees: [
      { id: "ezar", name: "ezar", tag: "cs.26", av: "ezar" },
      { id: "nami", name: "nami", tag: "cs.26", av: "nami" }
    ],
    tags: ["Pacillian Studies", "A5.51 (Ged Baru)"],
    mine: false
  },
  {
    id: "game",
    title: "MIKIRIN KONSEP GAME",
    openedBy: "benishere",
    hostAv: "benishere",
    hostTag: "cs.26",
    avatars: ["benishere", "abizar"],
    attendees: [
      { id: "abizar", name: "abizar", tag: "cs.26", av: "abizar" }
    ],
    tags: ["GameDev", "Selasar Gd Baru"],
    mine: false
  }
];
fs.writeFileSync(path.join(__dirname, 'data_meets.json'), JSON.stringify(dataMeets, null, 2), 'utf8');
console.log('Created data_meets.json');

// 4. DATA_ANNOUNCEMENTS.JSON
const dataAnnouncements = [
  {
    id: "ann_1",
    author: "imanuel",
    authorName: "imanuel",
    authorTag: "cs.26",
    authorAv: "imanuel",
    category: "Looking for Team",
    categoryKey: "team",
    title: "Looking for 1 Backend Developer (Django) - COMPFEST Hackathon",
    desc: "Halo teman-teman! Tim kami butuh 1 orang yang familiar dengan Django REST Framework dan PostgreSQL untuk ikutan COMPFEST Software Engineering Academy / Hackathon. Santai tapi committed, DM kalau minat!",
    tags: ["Django", "PostgreSQL", "COMPFEST"],
    time: "15 mins ago"
  },
  {
    id: "ann_2",
    author: "thealpharaoh",
    authorName: "thealpharaoh",
    authorTag: "cs.26",
    authorAv: "thealpharaoh",
    category: "Promotions",
    categoryKey: "promo",
    title: "ZELLASEYE Dance Cover Auditions Open! 💜",
    desc: "Open recruitment dancer untuk project cover K-Pop semester ganjil! Audisi santai di Selasar Gedung Baru Lt. 5. Semua angkatan Fasilkom boleh ikutan.",
    tags: ["Dance", "K-Pop", "PacilCommunity"],
    time: "1 hour ago"
  },
  {
    id: "ann_3",
    author: "cindireulla",
    authorName: "cindireulla",
    authorTag: "cs.26",
    authorAv: "cindireulla",
    category: "Campus Events",
    categoryKey: "event",
    title: "Study Jam: PBP Django Sprint & Best Practices",
    desc: "Malam ini kita adain review bareng di Discord Fasilkom dan Lab A1.01 buat bahas error authentication dan deployment Django. Terbuka untuk seluruh angkatan 26!",
    tags: ["WebDev", "Django", "PBP"],
    time: "3 hours ago"
  },
  {
    id: "ann_4",
    author: "nonapacil",
    authorName: "nonapacil",
    authorTag: "si.26",
    authorAv: "nonapacil",
    category: "Looking for Team",
    categoryKey: "team",
    title: "Gemastik UX Design Team - Need 1 UX Researcher / Designer",
    desc: "Tim Gemastik Divisi Desain Pengalaman Pengguna mencari 1 rekan yang suka interview user dan Figma. Portofolio santai aja, yang penting mau explore bareng!",
    tags: ["UI/UX", "Figma", "Gemastik"],
    time: "Yesterday"
  }
];
fs.writeFileSync(path.join(__dirname, 'data_announcements.json'), JSON.stringify(dataAnnouncements, null, 2), 'utf8');
console.log('Created data_announcements.json');

// 5. STYLE.CSS
const cssContent = `/* nongkee Design System - Multiples of 8 & 12 */
:root {
  --green: #00c060;
  --green-dark: #009e4f;
  --lime: #b8ff66;
  --olive: #5a7a2b;
  --brand: #2ccf72;
  --danger: #ef4444;
  --danger-soft: rgba(239, 68, 68, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
  font-family: Inter, -apple-system, "Segoe UI", sans-serif;
}

#stage {
  position: absolute;
  left: 0;
  top: 0;
  width: 1440px;
  height: 1024px;
  background: #fff;
  overflow: hidden;
  transform-origin: 0 0;
}

.abs { position: absolute; }

/* Header */
header {
  position: absolute;
  inset: 0 0 auto 0;
  height: 120px;
  z-index: 6;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}

.logo {
  position: absolute;
  left: 24px;
  top: 24px;
  cursor: pointer;
}

.word {
  position: absolute;
  left: 144px;
  top: 28px;
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.055em;
  color: var(--brand);
  line-height: 64px;
  cursor: pointer;
}

.who {
  position: absolute;
  right: 120px;
  top: 32px;
  text-align: right;
}

.who b {
  display: block;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--brand);
  line-height: 30px;
}

.who span {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #85deae;
  line-height: 20px;
  letter-spacing: -0.01em;
}

.me-av {
  position: absolute;
  left: 1344px;
  top: 24px;
  width: 72px;
  height: 72px;
}

/* Outer layout frame */
.frame {
  position: absolute;
  top: 120px;
  height: 880px;
  border: 1px solid #ededed;
  pointer-events: none;
}
#fl { left: 24px; width: 64px; }
#fr { left: 1352px; width: 64px; }
#fm { left: 108px; width: 1224px; }

/* Vertical Navigation Bar */
nav {
  position: absolute;
  left: 24px;
  top: 320px;
  width: 64px;
  height: 336px;
  border-radius: 32px;
  background: var(--green);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  gap: 24px;
}

.nav-item {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item svg {
  width: 32px;
  height: 32px;
  stroke: #fff;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.15s;
}

.nav-item.on svg { stroke: var(--lime); }

.nav-item .tooltip {
  position: absolute;
  left: 56px;
  background: #000;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 20;
}
.nav-item:hover .tooltip { opacity: 1; }

/* Generic View Title */
.view-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 136px;
  text-align: center;
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 56px;
  color: #000;
}

/* Base Avatars */
.av {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid var(--ring, var(--green));
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: none;
}
.av.big { width: 96px; height: 96px; }
.av.me { box-shadow: 0 0 0 3px var(--lime), 0 0 18px 4px rgba(184, 255, 102, 0.85); }

/* Fade & Scrim */
#fade {
  position: absolute;
  left: 0;
  right: 0;
  top: 930px;
  height: 94px;
  background: linear-gradient(rgba(255, 255, 255, 0), #fff 88%);
  z-index: 3;
  pointer-events: none;
}

#scrim {
  position: absolute;
  inset: 100px 0 0 0;
  background: rgba(255, 255, 255, 0.88);
  z-index: 15;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.open-detail #scrim,
.open-create #scrim,
.open-announce #scrim,
.open-friend #scrim {
  opacity: 1;
  pointer-events: auto;
}

/* ==========================================================================
   VIEW 1: OPEN MEETS
   ========================================================================== */
#meetsView { position: absolute; inset: 0; display: block; }

.meets-tab-bar {
  position: absolute;
  left: 138px;
  top: 184px;
  display: flex;
  gap: 12px;
  z-index: 4;
}

.tab-pill {
  height: 36px;
  padding: 0 20px;
  border-radius: 18px;
  background: #f3f6f0;
  border: 1.5px solid #d8e5d2;
  color: #444;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.tab-pill:hover { background: #e8f2e2; }
.tab-pill.active { background: var(--green); color: #fff; border-color: var(--green); }

#grid {
  position: absolute;
  left: 138px;
  top: 236px;
  display: grid;
  grid-template-columns: repeat(3, 372px);
  grid-auto-rows: 252px;
  gap: 48px 24px;
  z-index: 1;
  height: 750px;
  overflow-y: auto;
  padding-bottom: 120px;
  scrollbar-width: none;
}
#grid::-webkit-scrollbar { display: none; }

.card {
  position: relative;
  border-radius: 40px;
  background: var(--lime);
  cursor: pointer;
  --ring: var(--green);
  transition: transform 0.15s, box-shadow 0.15s;
}
.card:hover { transform: scale(1.015); box-shadow: 0 8px 24px rgba(0, 192, 96, 0.12); }

.card .avs {
  position: absolute;
  left: 0;
  right: 0;
  top: 16px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.card .t {
  position: absolute;
  left: 0;
  right: 0;
  top: 124px;
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 32px;
  color: #000;
  white-space: nowrap;
  padding: 0 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card .o {
  position: absolute;
  left: 0;
  right: 0;
  top: 156px;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 22px;
  color: var(--olive);
}
.tags {
  position: absolute;
  left: 0;
  right: 0;
  top: 196px;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
}
.tag {
  height: 36px;
  padding: 0 16px;
  border-radius: 18px;
  background: var(--green);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 36px;
  white-space: nowrap;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card.mine { background: var(--green); --ring: rgba(255, 255, 255, 0.9); }
.card.mine .t { color: #fff; }
.card.mine .o { color: rgba(255, 255, 255, 0.8); }
.card.mine .tag { background: #fff; color: var(--green); }

.create {
  border: 3px dashed var(--green);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.create:hover { transform: scale(1.015); background: #f6fff0; }
.create svg { width: 48px; height: 48px; stroke: var(--green); fill: none; stroke-width: 3; stroke-linecap: round; }

/* ==========================================================================
   VIEW 2: KATALOG KELAS KOSONG
   ========================================================================== */
#roomsView { position: absolute; inset: 0; display: none; }

.room-view-controls {
  position: absolute;
  left: 108px;
  top: 184px;
  width: 1224px;
  background: #fcfdfc;
  border: 2px solid #e7eee5;
  border-radius: 24px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 4;
}

.controls-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-search-input {
  width: 320px;
  height: 40px;
  border-radius: 20px;
  border: 1.5px solid #d4e2d0;
  padding: 0 16px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
}
.room-search-input:focus { border-color: var(--green); }

#roomsGrid {
  position: absolute;
  left: 108px;
  top: 396px;
  width: 1224px;
  height: 592px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  overflow-y: auto;
  padding-bottom: 120px;
  scrollbar-width: none;
}
#roomsGrid::-webkit-scrollbar { display: none; }

.room-dir-card {
  background: #fff;
  border: 2px solid #e8ede6;
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.15s;
}
.room-dir-card:hover {
  border-color: var(--green);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
.room-dir-card.free { border-top: 6px solid var(--green); }
.room-dir-card.busy { border-top: 6px solid var(--danger); background: #fafafa; }

.dir-room-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #111;
}

.dir-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.dir-badge.free { background: rgba(0, 192, 96, 0.15); border: 1.5px solid var(--green); color: var(--green-dark); }
.dir-badge.busy { background: var(--danger-soft); border: 1.5px solid var(--danger); color: var(--danger); }

.dir-body {
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #555;
  line-height: 1.5;
}
.dir-busy-course { font-size: 17px; font-weight: 700; color: #222; margin-bottom: 6px; }
.dir-busy-time { font-size: 14px; color: var(--danger); font-weight: 600; margin-bottom: 4px; }
.dir-busy-lec { font-size: 13px; color: #777; }
.dir-free-msg { color: var(--green-dark); font-weight: 600; font-size: 15px; }

.quick-book-btn {
  margin-top: 12px;
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background: var(--lime);
  border: 2px solid var(--green);
  color: var(--green-dark);
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s;
}
.quick-book-btn:hover { background: var(--green); color: #fff; }

/* Filter rows & mini pills */
.time-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mini-pill {
  padding: 6px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #d9e6d0;
  color: #444;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.mini-pill:hover { border-color: var(--green); }
.mini-pill.active { background: var(--green); color: #fff; border-color: var(--green); }

/* ==========================================================================
   VIEW 3: FRIENDS (LIVE SCHEDULE STATUS)
   ========================================================================== */
#friendsView { position: absolute; inset: 0; display: none; }

.friends-controls {
  position: absolute;
  left: 108px;
  top: 184px;
  width: 1224px;
  background: #fcfdfc;
  border: 2px solid #e7eee5;
  border-radius: 24px;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
}

.time-switcher-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.time-switcher-label {
  font-size: 14px;
  font-weight: 700;
  color: #444;
  margin-right: 4px;
}

#friendsGrid {
  position: absolute;
  left: 108px;
  top: 288px;
  width: 1224px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  overflow-y: auto;
  padding-bottom: 120px;
  scrollbar-width: none;
}
#friendsGrid::-webkit-scrollbar { display: none; }

.friend-card {
  background: #fff;
  border: 2px solid #e8ede6;
  border-radius: 24px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  transition: all 0.15s;
}
.friend-card:hover {
  border-color: var(--green);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}
.friend-card-left {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
}
.friend-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.friend-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.friend-name {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
}
.friend-tag {
  font-size: 13px;
  font-weight: 600;
  color: var(--olive);
}
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.status-badge.in-class { background: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }
.status-badge.free { background: rgba(0, 192, 96, 0.15); border: 1px solid var(--green); color: var(--green-dark); }

.friend-location-text {
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 340px;
}

.friend-action-btn {
  height: 38px;
  padding: 0 18px;
  border-radius: 19px;
  background: #f2f7ef;
  border: 1.5px solid #d4e5ce;
  color: var(--olive);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.friend-action-btn:hover {
  background: var(--green);
  color: #fff;
  border-color: var(--green);
}

/* ==========================================================================
   VIEW 4: ANNOUNCEMENTS & BROADCASTS
   ========================================================================== */
#announceView { position: absolute; inset: 0; display: none; }

.announce-controls {
  position: absolute;
  left: 108px;
  top: 184px;
  width: 1224px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
}
.announce-pills { display: flex; gap: 10px; }

.post-announce-btn {
  height: 44px;
  padding: 0 24px;
  border-radius: 22px;
  background: var(--green);
  color: #fff;
  border: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(0, 192, 96, 0.25);
  transition: all 0.15s;
}
.post-announce-btn:hover { background: var(--green-dark); transform: scale(1.02); }

#announceList {
  position: absolute;
  left: 108px;
  top: 248px;
  width: 1224px;
  height: 740px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  padding-bottom: 120px;
  scrollbar-width: none;
}
#announceList::-webkit-scrollbar { display: none; }

.announce-card {
  background: #fff;
  border: 2px solid #e8ede6;
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.15s;
}
.announce-card:hover {
  border-color: var(--green);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
.announce-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.announce-author-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.announce-author-name {
  font-size: 18px;
  font-weight: 700;
  color: #111;
}
.announce-author-sub {
  font-size: 13px;
  color: #777;
  font-weight: 500;
}
.announce-cat-badge {
  padding: 4px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.announce-cat-badge.team { background: rgba(0, 192, 96, 0.15); border: 1.5px solid var(--green); color: var(--green-dark); }
.announce-cat-badge.promo { background: #fdf6e2; border: 1.5px solid #e8c655; color: #966e06; }
.announce-cat-badge.event { background: #edf2fc; border: 1.5px solid #9bb5e8; color: #2c5299; }

.announce-title {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #111;
}
.announce-desc {
  font-size: 16px;
  color: #444;
  line-height: 1.5;
}
.announce-tags-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.announce-tag {
  padding: 4px 12px;
  border-radius: 12px;
  background: #f0f7ec;
  border: 1px solid #d4edd0;
  color: var(--olive);
  font-size: 13px;
  font-weight: 600;
}

/* ==========================================================================
   MODAL 1: MEET DETAILS
   ========================================================================== */
#modal {
  position: absolute;
  left: 168px;
  top: 184px;
  width: 1104px;
  height: 648px;
  border-radius: 48px;
  background: var(--lime);
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.97);
  transition: opacity 0.2s, transform 0.2s, background 0.2s;
  --ring: #fff;
  color: #000;
  padding: 48px;
}
.open-detail #modal { opacity: 1; pointer-events: auto; transform: none; }
#modal .m { position: absolute; left: 72px; white-space: nowrap; }
#mt { top: 72px; font-size: 46px; font-weight: 700; letter-spacing: -0.05em; line-height: 58px; max-width: 740px; overflow: hidden; text-overflow: ellipsis; }
#ms { top: 132px; font-size: 24px; font-weight: 500; letter-spacing: -0.03em; line-height: 30px; color: var(--olive); }
#mr { top: 184px; font-size: 24px; font-weight: 500; letter-spacing: -0.03em; line-height: 30px; color: var(--olive); }

#btn {
  position: absolute;
  left: 72px;
  top: 240px;
  height: 48px;
  padding: 0 48px;
  border-radius: 24px;
  border: 0;
  background: #fff;
  color: var(--green);
  font: 600 24px/48px Inter, sans-serif;
  letter-spacing: -0.03em;
  cursor: pointer;
  transition: transform 0.1s;
}
#btn:hover { transform: scale(1.02); }

#ma { top: 336px; font-size: 24px; font-weight: 600; letter-spacing: -0.03em; line-height: 30px; }
#att { position: absolute; left: 72px; top: 408px; display: flex; gap: 24px; max-width: 740px; overflow-x: auto; }

.at { width: 120px; text-align: center; }
.at .av { width: 120px; height: 120px; border-width: 4px; display: block; }
.at p { margin-top: 8px; font-size: 20px; font-weight: 600; letter-spacing: -0.03em; line-height: 26px; white-space: nowrap; }
.at sup { font-size: 14px; font-weight: 500; color: var(--olive); margin-left: 2px; vertical-align: top; position: relative; top: -4px; }

#host { position: absolute; left: 848px; top: 72px; width: 192px; text-align: center; }
#host .av { width: 192px; height: 192px; border-width: 4px; display: block; }
#host p { margin-top: 12px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; line-height: 30px; }
#host sup { font-size: 16px; font-weight: 500; color: var(--olive); margin-left: 4px; vertical-align: top; position: relative; top: -4px; }

#modal.joined { background: var(--green); }
.joined #mt, .joined #ma, .joined .at p, .joined #host p { color: #fff; }
.joined #ms, .joined #mr { color: rgba(255, 255, 255, 0.85); }
.joined .at sup, .joined #host sup { color: rgba(255, 255, 255, 0.75); }
.joined .at .av.me { box-shadow: 0 0 0 4px var(--lime), 0 0 22px 6px rgba(184, 255, 102, 0.85); }

.close-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #ededed;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #666;
  transition: all 0.15s;
}
.close-btn:hover { background: #f5f5f5; color: #000; border-color: #ccc; }

#closeDetailBtn { position: absolute; right: 32px; top: 32px; z-index: 25; }
.joined #closeDetailBtn { background: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.4); color: #fff; }
.joined #closeDetailBtn:hover { background: rgba(255, 255, 255, 0.45); }

/* ==========================================================================
   MODAL 2: START A MEET
   ========================================================================== */
#createModal {
  position: absolute;
  left: 168px;
  top: 160px;
  width: 1104px;
  height: 720px;
  border-radius: 48px;
  background: #fff;
  border: 4px solid var(--lime);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.97);
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  padding: 36px 48px;
  color: #000;
}
.open-create #createModal { opacity: 1; pointer-events: auto; transform: none; }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.modal-header h2 {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--green);
}
.modal-header p {
  font-size: 16px;
  color: var(--olive);
  font-weight: 500;
  margin-top: 2px;
}

.create-body {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 32px;
  flex: 1;
  min-height: 0;
}
.left-pane { display: flex; flex-direction: column; gap: 16px; }
.field-group { display: flex; flex-direction: column; gap: 8px; }
.field-label { font-size: 14px; font-weight: 700; letter-spacing: -0.01em; color: #333; display: flex; justify-content: space-between; align-items: center; }

.input-txt {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  border: 2px solid #e5e5e5;
  padding: 0 20px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  transition: border 0.15s;
}
.input-txt:focus { border-color: var(--green); }

.topic-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.topic-pill {
  padding: 6px 16px;
  border-radius: 16px;
  background: #f0f7ec;
  border: 1px solid #d4edd0;
  color: var(--olive);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.topic-pill:hover { background: #e2f2da; }
.topic-pill.active { background: var(--green); color: #fff; border-color: var(--green); }

.right-pane {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #f9fcf8;
  border: 2px solid #e5f2e0;
  border-radius: 32px;
  padding: 24px;
}
.filter-bar { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e2ebd0; }

.room-scroll-box {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  padding-right: 6px;
}
.room-scroll-box::-webkit-scrollbar { width: 6px; }
.room-scroll-box::-webkit-scrollbar-thumb { background: #c0d6b5; border-radius: 3px; }

.room-item {
  background: #fff;
  border: 2px solid #e0ebd8;
  border-radius: 18px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.room-item:hover { border-color: var(--green); transform: translateY(-1px); }
.room-item.selected { background: var(--lime); border-color: var(--green); box-shadow: 0 4px 12px rgba(0, 192, 96, 0.18); }
.room-item.occupied { opacity: 0.65; background: #fcfcfc; border-color: #eee; }
.room-item-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.room-item-name { font-size: 15px; font-weight: 700; color: #111; }
.room-badge { font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; letter-spacing: 0.3px; }
.room-badge.free { background: rgba(0, 192, 96, 0.15); color: var(--green-dark); }
.room-badge.busy { background: var(--danger-soft); color: var(--danger); }
.room-item-sub { font-size: 12px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.create-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #ededed;
}
.selected-summary { font-size: 15px; color: #333; display: flex; align-items: center; gap: 8px; }
.selected-summary b { color: var(--green); font-size: 17px; }
.launch-btn {
  height: 48px;
  padding: 0 36px;
  border-radius: 24px;
  background: var(--green);
  color: #fff;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 6px 18px rgba(0, 192, 96, 0.35);
  transition: all 0.15s;
}
.launch-btn:hover { background: var(--green-dark); transform: scale(1.02); }

/* ==========================================================================
   MODAL 3: POST ANNOUNCEMENT
   ========================================================================== */
#createAnnounceModal {
  position: absolute;
  left: 240px;
  top: 180px;
  width: 960px;
  height: 660px;
  border-radius: 48px;
  background: #fff;
  border: 4px solid var(--lime);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.97);
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  padding: 36px 48px;
  color: #000;
}
.open-announce #createAnnounceModal { opacity: 1; pointer-events: auto; transform: none; }

.announce-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 12px;
}
.announce-textarea {
  width: 100%;
  height: 120px;
  border-radius: 20px;
  border: 2px solid #e5e5e5;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  resize: none;
  transition: border 0.15s;
}
.announce-textarea:focus { border-color: var(--green); }

/* ==========================================================================
   MODAL 4: ADD FRIEND
   ========================================================================== */
#addFriendModal {
  position: absolute;
  left: 360px;
  top: 260px;
  width: 720px;
  height: 440px;
  border-radius: 40px;
  background: #fff;
  border: 4px solid var(--lime);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.97);
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  padding: 36px 48px;
  color: #000;
}
.open-friend #addFriendModal { opacity: 1; pointer-events: auto; transform: none; }
`;
fs.writeFileSync(path.join(__dirname, 'style.css'), cssContent, 'utf8');
console.log('Created style.css');

// 6. SCRIPT.JS
const jsContent = `/* nongkee Application Script */
// Global State Stores
let SCHEDULE_SLOTS = [];
let CASUAL_SPOTS = [];
let ACADEMIC_ROOMS = [];
let AV = {};
let FRIENDS_DATA = [];
let cards = [];
let ANNOUNCEMENTS_DATA = [];

let activeMeet = null;
let activeMeetsTab = "all";
let selectedRoomForMeet = "A6.08 (Ged Baru)";

// Room finder filter state
let selectedDay = "Selasa";
let selectedTime = "10:00-12:00";
let selectedBld = "Ged Baru";

// Directory view filter state
let dirDay = "Selasa";
let dirTime = "10:00-12:00";
let dirBld = "Ged Baru";
let dirSearchQuery = "";

// Friends clock state
let selectedClock = "09:41";

// Announcements category filter
let selectedAnnounceCat = "all";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => s ? String(s).replace(/</g, "&lt;") : "";
const av = (k, cls="") => \`<div class="av \${cls}" style="background-image:\${AV[k]||AV.me}"></div>\`;

/* Time overlap logic */
function toMinutes(t) {
  if (!t) return 0;
  const [h, m] = t.split(/[:.]/).map(Number);
  return h * 60 + m;
}

function isOverlapping(s1, e1, s2, e2) {
  return Math.max(toMinutes(s1), toMinutes(s2)) < Math.min(toMinutes(e1), toMinutes(e2));
}

function checkRoomStatus(day, timeRange) {
  const [start, end] = timeRange.split('-');
  const occupiedMap = new Map();

  for (const s of SCHEDULE_SLOTS) {
    if (s.day.toLowerCase() === day.toLowerCase()) {
      if (isOverlapping(start, end, s.start_time, s.end_time)) {
        occupiedMap.set(s.room, s);
      }
    }
  }
  return occupiedMap;
}

/* Render Open Meets Grid: Host 96x96 (.av.big), Attendees 72x72 (.av) */
function renderMeets(filterMine = false) {
  const list = filterMine 
    ? cards.filter(c => c === "create" || (typeof c === "object" && c.mine))
    : cards;

  $("#grid").innerHTML = list.map((c, i) => {
    if (c === "create") {
      return \`<div class="card create" id="openCreateCard"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><path d="M24 14v20M14 24h20"/></svg></div>\`;
    }
    const a = (c.av || ["me"]).map((k, j) => av(k, (j === 0 ? "big " : "") + (k === "me" || k === "bian" ? "me" : ""))).join("");
    return \`<div class="card \${c.mine ? "mine" : ""}" data-id="\${c.id || i}" data-title="\${esc(c.t)}">
      <div class="avs">\${a}</div>
      <div class="t">\${esc(c.t)}</div>
      <div class="o">opened by: \${esc(c.o)}</div>
      <div class="tags">
        \${(c.tags || []).map((x) => \`<span class="tag">\${esc(x)}</span>\`).join("")}
      </div>
    </div>\`;
  }).join("");
}

/* Render Modal Attendees dynamically */
function renderModalAttendees(meet) {
  const attBox = $("#att");
  if (!meet.attendees || meet.attendees.length === 0) {
    attBox.innerHTML = \`<div style="font-size:18px;font-weight:500;color:var(--olive);padding-top:28px;">Belum ada attendee lain, yuk join!</div>\`;
    return;
  }
  attBox.innerHTML = meet.attendees.map(a => {
    const isMe = a.isMe || a.av === "me" || a.av === "bian";
    return \`<div class="at">
      \${av(a.av || a.id, isMe ? "me" : "")}
      <p>\${esc(a.name)}<sup>\${esc(a.tag || "cs.26")}</sup></p>
    </div>\`;
  }).join("");
}

/* Open Meet Details Modal */
function openMeetDetail(found) {
  activeMeet = found;
  $("#mt").textContent = found.t;
  $("#ms").textContent = (found.tags && found.tags[0]) || "General";
  $("#mr").textContent = "Room: " + ((found.tags && found.tags[1]) || "TBA");
  
  const hostAvKey = found.hostAv || found.o;
  $("#host").innerHTML = \`<div class="av big" style="background-image:\${AV[hostAvKey]||AV.me}"></div><p>\${esc(found.o)}<sup>\${esc(found.hostTag || "cs.26")}</sup></p>\`;
  
  const m = $("#modal");
  m.classList.toggle("joined", !!found.mine);
  $("#btn").textContent = found.mine ? "leave" : "join";

  renderModalAttendees(found);
  $("#stage").classList.add("open-detail");
}

/* Render Room Finder inside Create Meet Modal */
function renderCreateRoomFinder() {
  const occupied = checkRoomStatus(selectedDay, selectedTime);

  let pool = [];
  if (selectedBld === "Santai") {
    pool = CASUAL_SPOTS.map(name => ({ room: name, isCasual: true }));
  } else {
    let aca = ACADEMIC_ROOMS;
    if (selectedBld) {
      aca = aca.filter(r => r.toLowerCase().includes(selectedBld.toLowerCase()));
    }
    pool = aca.map(name => ({ room: name, isCasual: false }));
    if (!selectedBld || selectedBld.toLowerCase().includes("santai")) {
      pool.push(...CASUAL_SPOTS.map(name => ({ room: name, isCasual: true })));
    }
  }

  let freeCount = 0;
  const items = pool.map(item => {
    const isBusy = occupied.has(item.room) && !item.isCasual;
    if (!isBusy) freeCount++;
    return {
      room: item.room,
      isBusy,
      slot: occupied.get(item.room)
    };
  });

  items.sort((a, b) => (a.isBusy === b.isBusy ? a.room.localeCompare(b.room) : a.isBusy ? 1 : -1));

  $("#availCount").innerHTML = \`<b style="color:var(--green)">\${freeCount}</b> free rooms\`;

  const box = $("#roomScrollBox");
  box.innerHTML = items.map(it => {
    const isSel = it.room === selectedRoomForMeet;
    return \`<div class="room-item \${isSel ? 'selected' : ''} \${it.isBusy ? 'occupied' : ''}" data-room="\${esc(it.room)}">
      <div class="room-item-top">
        <div class="room-item-name">\${esc(it.room)}</div>
        <span class="room-badge \${it.isBusy ? 'busy' : 'free'}">\${it.isBusy ? 'Terpakai' : 'Kosong'}</span>
      </div>
      <div class="room-item-sub">
        \${it.isBusy ? \`Sedang dipakai: \${esc(it.slot.course_name)}\` : \`Tersedia pada \${selectedTime}\`}
      </div>
    </div>\`;
  }).join("");

  $("#summaryRoomName").textContent = selectedRoomForMeet || "Belum dipilih";
  $("#summaryTimeBadge").textContent = \`(\${selectedDay}, \${selectedTime})\`;
}

/* Render Katalog Kelas Kosong View */
function renderRoomsDirectory() {
  const occupied = checkRoomStatus(dirDay, dirTime);

  let pool = ACADEMIC_ROOMS;
  if (dirBld) {
    pool = pool.filter(r => r.toLowerCase().includes(dirBld.toLowerCase()));
  }
  if (dirSearchQuery) {
    pool = pool.filter(r => r.toLowerCase().includes(dirSearchQuery.toLowerCase()));
  }

  let freeCount = 0;
  const items = pool.map(room => {
    const isBusy = occupied.has(room);
    if (!isBusy) freeCount++;
    return { room, isBusy, slot: occupied.get(room) };
  });

  items.sort((a, b) => (a.isBusy === b.isBusy ? a.room.localeCompare(b.room) : a.isBusy ? 1 : -1));

  $("#dirAvailCount").textContent = \`\${freeCount} Ruangan Kosong (\${dirDay}, \${dirTime})\`;

  const grid = $("#roomsGrid");
  if (items.length === 0) {
    grid.innerHTML = \`<div style="grid-column:span 2;text-align:center;padding:48px;font-size:18px;color:#777;">Tidak ada ruangan yang cocok dengan pencarian</div>\`;
    return;
  }

  grid.innerHTML = items.map(it => {
    return \`<div class="room-dir-card \${it.isBusy ? 'busy' : 'free'}">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div class="dir-room-title">\${esc(it.room)}</div>
          <span class="dir-badge \${it.isBusy ? 'busy' : 'free'}">\${it.isBusy ? 'Terpakai' : 'Kosong'}</span>
        </div>
        <div class="dir-body">
          \${it.isBusy ? \`
            <div class="dir-busy-course">\${esc(it.slot.course_name)} (\${esc(it.slot.class_name)})</div>
            <div class="dir-busy-time">Waktu: \${it.slot.start_time} - \${it.slot.end_time}</div>
            <div class="dir-busy-lec">Dosen: \${esc((it.slot.lecturers||[]).join(', ')||'-')}</div>
          \` : \`
            <div class="dir-free-msg">Ruangan kosong dan siap digunakan nongkee atau belajar.</div>
            <div style="font-size:13px;color:#777;margin-top:6px;">Kapasitas kelas reguler Fasilkom UI</div>
          \`}
        </div>
      </div>
      <div>
        \${!it.isBusy ? \`
          <button class="quick-book-btn" data-room-book="\${esc(it.room)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Start Meet Here
          </button>
        \` : \`
          <div style="font-size:13px;color:#888;text-align:center;padding:12px 0;background:#f5f5f5;border-radius:16px;">Sedang digunakan untuk perkuliahan</div>
        \`}
      </div>
    </div>\`;
  }).join("");
}

/* Render Friends View (Two People Icon: see where friends are right now) */
function renderFriends() {
  const grid = $("#friendsGrid");
  grid.innerHTML = FRIENDS_DATA.map(f => {
    const item = (f.schedule && f.schedule[selectedClock]) || { status: "free", spot: "Kantin Pacil", note: "Nongkee santai" };
    const inClass = item.status === "in_class";
    return \`<div class="friend-card">
      <div class="friend-card-left">
        \${av(f.av || f.id)}
        <div class="friend-info">
          <div class="friend-name-row">
            <span class="friend-name">\${esc(f.name)}</span>
            <span class="friend-tag">\${esc(f.tag)}</span>
            <span class="status-badge \${inClass ? 'in-class' : 'free'}">\${inClass ? 'In Class' : 'Free'}</span>
          </div>
          <div class="friend-location-text">
            \${inClass ? \`\${esc(item.course)} • \${esc(item.room)} (\${item.time})\` : \`\${esc(item.spot)} • \${esc(item.note)}\`}
          </div>
        </div>
      </div>
      <button class="friend-action-btn" data-friend-wave="\${esc(f.name)}">Wave</button>
    </div>\`;
  }).join("");
}

/* Render Announcements View */
function renderAnnouncements() {
  const list = $("#announceList");
  let filtered = ANNOUNCEMENTS_DATA;
  if (selectedAnnounceCat !== "all") {
    filtered = filtered.filter(a => a.categoryKey === selectedAnnounceCat);
  }

  if (filtered.length === 0) {
    list.innerHTML = \`<div style="text-align:center;padding:48px;font-size:18px;color:#777;">Belum ada broadcast untuk kategori ini</div>\`;
    return;
  }

  list.innerHTML = filtered.map(a => {
    return \`<div class="announce-card">
      <div class="announce-card-header">
        <div class="announce-author-row">
          \${av(a.authorAv || a.author)}
          <div>
            <div class="announce-author-name">\${esc(a.authorName)} <span style="font-size:13px;color:var(--olive);font-weight:600;">\${esc(a.authorTag)}</span></div>
            <div class="announce-author-sub">\${esc(a.time)}</div>
          </div>
        </div>
        <span class="announce-cat-badge \${a.categoryKey}">\${esc(a.category)}</span>
      </div>
      <div class="announce-title">\${esc(a.title)}</div>
      <div class="announce-desc">\${esc(a.desc)}</div>
      <div class="announce-tags-row">
        \${(a.tags || []).map(t => \`<span class="announce-tag">\${esc(t)}</span>\`).join("")}
      </div>
    </div>\`;
  }).join("");
}

/* Switch Views */
function switchView(viewName) {
  $$("nav .nav-item").forEach(n => n.classList.remove("on"));
  ["#meetsView", "#roomsView", "#friendsView", "#announceView"].forEach(id => {
    $(id).style.display = "none";
  });

  if (viewName === "meets") {
    $("#navMeets").classList.add("on");
    $("#meetsView").style.display = "block";
    renderMeets(activeMeetsTab === "mine");
  } else if (viewName === "rooms") {
    $("#navRooms").classList.add("on");
    $("#roomsView").style.display = "block";
    renderRoomsDirectory();
  } else if (viewName === "friends") {
    $("#navFriends").classList.add("on");
    $("#friendsView").style.display = "block";
    renderFriends();
  } else if (viewName === "announce") {
    $("#navAnnounce").classList.add("on");
    $("#announceView").style.display = "block";
    renderAnnouncements();
  }
}

/* Modal and Flow Event Handlers */
function setupEvents() {
  // Bind Header & Element Avatars
  document.querySelectorAll("[data-av]").forEach(e => {
    const k = e.dataset.av;
    e.style.backgroundImage = AV[k] || AV.me;
  });

  // Nav Item Clicks
  $("#navMeets").onclick = () => switchView("meets");
  $("#navRooms").onclick = () => switchView("rooms");
  $("#navFriends").onclick = () => switchView("friends");
  $("#navAnnounce").onclick = () => switchView("announce");

  // Header Logo click returns home
  $("#homeLogo").onclick = $("#homeWord").onclick = () => switchView("meets");

  // Meets Tab Bar (All Meets vs My Meets)
  $("#tabAllMeets").onclick = () => {
    activeMeetsTab = "all";
    $("#tabAllMeets").classList.add("active");
    $("#tabMyMeets").classList.remove("active");
    renderMeets(false);
  };
  $("#tabMyMeets").onclick = () => {
    activeMeetsTab = "mine";
    $("#tabMyMeets").classList.add("active");
    $("#tabAllMeets").classList.remove("active");
    renderMeets(true);
  };

  // Open Create Modal
  document.addEventListener("click", e => {
    const createCard = e.target.closest("#openCreateCard");
    if (createCard) {
      $("#stage").classList.remove("open-detail", "open-announce", "open-friend");
      $("#stage").classList.add("open-create");
      renderCreateRoomFinder();
    }
  });

  // Quick Book button in Rooms Directory
  $("#roomsGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-room-book]");
    if (btn) {
      selectedRoomForMeet = btn.dataset.roomBook;
      $("#stage").classList.remove("open-detail", "open-announce", "open-friend");
      $("#stage").classList.add("open-create");
      renderCreateRoomFinder();
    }
  });

  // Close modals
  $("#closeDetailBtn").onclick = () => $("#stage").classList.remove("open-detail");
  $("#closeCreateBtn").onclick = () => $("#stage").classList.remove("open-create");
  $("#closeAnnounceModalBtn").onclick = () => $("#stage").classList.remove("open-announce");
  $("#closeAddFriendModalBtn").onclick = () => $("#stage").classList.remove("open-friend");

  $("#scrim").onclick = () => {
    $("#stage").classList.remove("open-detail", "open-create", "open-announce", "open-friend");
  };
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      $("#stage").classList.remove("open-detail", "open-create", "open-announce", "open-friend");
    }
  });

  // Open Meet details
  $("#grid").addEventListener("click", e => {
    const card = e.target.closest(".card:not(.create)");
    if (!card) return;
    const title = card.dataset.title;
    const id = card.dataset.id;
    const found = cards.find(c => typeof c === "object" && (c.id === id || c.t === title));

    if (found) {
      openMeetDetail(found);
    }
  });

  // Join/Leave button in detail modal
  $("#btn").onclick = () => {
    if (!activeMeet) return;
    activeMeet.mine = !activeMeet.mine;
    
    if (activeMeet.mine) {
      if (!activeMeet.attendees) activeMeet.attendees = [];
      if (!activeMeet.attendees.some(a => a.isMe || a.av === "me" || a.av === "bian")) {
        activeMeet.attendees.push({
          id: "me",
          name: "bian/varo",
          tag: "cs.26",
          av: "me",
          isMe: true
        });
      }
      if (!activeMeet.av.includes("me")) {
        activeMeet.av.push("me");
      }
    } else {
      if (activeMeet.attendees) {
        activeMeet.attendees = activeMeet.attendees.filter(a => !(a.isMe || a.av === "me" || a.av === "bian"));
      }
      if (activeMeet.av) {
        activeMeet.av = activeMeet.av.filter(x => x !== "me" && x !== "bian");
      }
    }

    const m = $("#modal");
    m.classList.toggle("joined", !!activeMeet.mine);
    $("#btn").textContent = activeMeet.mine ? "leave" : "join";
    renderModalAttendees(activeMeet);
    renderMeets(activeMeetsTab === "mine");
  };

  // Topic pill click in create modal
  $("#topicPills").addEventListener("click", e => {
    const pill = e.target.closest(".topic-pill");
    if (!pill) return;
    $$("#topicPills .topic-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
  });

  // Create room filter clicks
  $("#createDayFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#createDayFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDay = btn.dataset.day;
    renderCreateRoomFinder();
  });

  $("#createTimeFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#createTimeFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedTime = btn.dataset.time;
    renderCreateRoomFinder();
  });

  $("#createBldFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#createBldFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedBld = btn.dataset.bld;
    renderCreateRoomFinder();
  });

  // Select room chip
  $("#roomScrollBox").addEventListener("click", e => {
    const item = e.target.closest(".room-item");
    if (!item) return;
    selectedRoomForMeet = item.dataset.room;
    $$("#roomScrollBox .room-item").forEach(i => i.classList.remove("selected"));
    item.classList.add("selected");
    $("#summaryRoomName").textContent = selectedRoomForMeet;
  });

  // Launch Meet action
  $("#launchMeetBtn").onclick = () => {
    const title = $("#newTitle").value.trim() || "Study Meet";
    const topic = ($(".topic-pill.active") || {}).dataset?.val || "Pacillian Studies";
    const room = selectedRoomForMeet || "A6.08 (Ged Baru)";

    const newMeet = {
      id: "meet_" + Date.now(),
      t: title,
      o: "bian/varo",
      hostAv: "me",
      hostTag: "cs.26",
      av: ["me"],
      attendees: [],
      tags: [topic, room],
      mine: true,
      time: selectedTime,
      day: selectedDay
    };

    cards.splice(1, 0, newMeet);
    renderMeets(activeMeetsTab === "mine");
    $("#stage").classList.remove("open-create");
    openMeetDetail(newMeet);
  };

  // Rooms Directory Search & Filters
  $("#roomSearchInput").oninput = e => {
    dirSearchQuery = e.target.value.trim();
    renderRoomsDirectory();
  };

  $("#viewDayFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#viewDayFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    dirDay = btn.dataset.day;
    renderRoomsDirectory();
  });

  $("#viewTimeFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#viewTimeFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    dirTime = btn.dataset.time;
    renderRoomsDirectory();
  });

  $("#viewBuildingFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#viewBuildingFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    dirBld = btn.dataset.bld;
    renderRoomsDirectory();
  });

  // Friends Time Switcher
  $(".time-switcher-box").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$(".time-switcher-box .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedClock = btn.dataset.clock;
    renderFriends();
  });

  // Wave to friend
  $("#friendsGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-friend-wave]");
    if (!btn) return;
    btn.textContent = "Waved!";
    btn.style.background = "var(--green)";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Wave";
      btn.style.background = "";
      btn.style.color = "";
    }, 1800);
  });

  // Add Friend Flow
  $("#openAddFriendBtn").onclick = () => {
    $("#stage").classList.remove("open-detail", "open-create", "open-announce");
    $("#stage").classList.add("open-friend");
    $("#newFriendInput").value = "";
    $("#newFriendInput").focus();
  };

  $("#submitAddFriendBtn").onclick = () => {
    const val = $("#newFriendInput").value.trim();
    if (val) {
      FRIENDS_DATA.push({
        id: "friend_" + Date.now(),
        name: val,
        tag: "pacil.26",
        av: "me",
        schedule: {
          "08:30": { status: "free", spot: "Kantin Pacil", note: "Nongkrong pagi" },
          "09:41": { status: "free", spot: "Perpus Pacil Lt. 2", note: "Nugas santai" },
          "11:30": { status: "free", spot: "Kantin Pacil", note: "Makan siang" },
          "13:30": { status: "free", spot: "Stulo 1", note: "Belajar bareng" },
          "15:45": { status: "free", spot: "Taman Pacil", note: "Nongkee sore" }
        }
      });
      renderFriends();
      $("#stage").classList.remove("open-friend");
    }
  };

  // Announcements Category Filter
  $("#announceCatFilter").addEventListener("click", e => {
    const btn = e.target.closest(".mini-pill");
    if (!btn) return;
    $$("#announceCatFilter .mini-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedAnnounceCat = btn.dataset.cat;
    renderAnnouncements();
  });

  // Post Announcement Flow
  $("#openPostAnnounceBtn").onclick = () => {
    $("#stage").classList.remove("open-detail", "open-create", "open-friend");
    $("#stage").classList.add("open-announce");
    $("#newAnnounceTitle").value = "";
    $("#newAnnounceDesc").value = "";
  };

  $("#newAnnounceCatPills").addEventListener("click", e => {
    const pill = e.target.closest(".topic-pill");
    if (!pill) return;
    $$("#newAnnounceCatPills .topic-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
  });

  $("#publishAnnounceBtn").onclick = () => {
    const title = $("#newAnnounceTitle").value.trim() || "Pacil Discussion";
    const catPill = $("#newAnnounceCatPills .topic-pill.active");
    const catKey = catPill ? catPill.dataset.cat : "team";
    const catLabel = catPill ? catPill.textContent : "Looking for Team";
    const desc = $("#newAnnounceDesc").value.trim() || "Halo guys, kontak @bian untuk info lebih lanjut!";
    const rawTags = $("#newAnnounceTags").value.trim();
    const tags = rawTags ? rawTags.split(',').map(s => s.trim()).filter(Boolean) : ["Pacil"];

    const newAnn = {
      id: "ann_" + Date.now(),
      author: "me",
      authorName: "bian/varo",
      authorTag: "cs.26",
      authorAv: "me",
      category: catLabel,
      categoryKey: catKey,
      title: title,
      desc: desc,
      tags: tags,
      time: "Just now"
    };

    ANNOUNCEMENTS_DATA.unshift(newAnn);
    renderAnnouncements();
    $("#stage").classList.remove("open-announce");
  };
}

// Stage scaling for any screen size
function fit() {
  const s = Math.min(innerWidth / 1440, innerHeight / 1024);
  const st = $("#stage");
  st.style.transform = \`translate(\${(innerWidth - 1440 * s) / 2}px, \${(innerHeight - 1024 * s) / 2}px) scale(\${s})\`;
}
addEventListener("resize", fit);

// Fallback data for offline file:/// double-clicking
function initFallbacks() {
  SCHEDULE_SLOTS = ${JSON.stringify(slots)};
  CASUAL_SPOTS = ${JSON.stringify(casualSpots)};
  ACADEMIC_ROOMS = ${JSON.stringify(academicRooms)};
  const fallbackUsers = ${JSON.stringify(dataUsers)};
  AV = {};
  for (const [k, p] of Object.entries(fallbackUsers.avatars)) {
    AV[k] = \`url('\${p}')\`;
  }
  FRIENDS_DATA = fallbackUsers.friends;
  const fallbackMeets = ${JSON.stringify(dataMeets)};
  cards = ["create", ...fallbackMeets.map(m => ({
    id: m.id,
    t: m.title,
    o: m.openedBy,
    hostAv: m.hostAv,
    hostTag: m.hostTag,
    av: m.avatars,
    attendees: m.attendees,
    tags: m.tags,
    mine: m.mine
  }))];
  ANNOUNCEMENTS_DATA = ${JSON.stringify(dataAnnouncements)};
}

// Data Loader: Attempts fetch of JSON files, gracefully falls back if CORS restricts file:///
async function loadData() {
  try {
    const [classesRes, usersRes, meetsRes, annRes] = await Promise.all([
      fetch('data_classes.json').then(r => r.json()),
      fetch('data_users.json').then(r => r.json()),
      fetch('data_meets.json').then(r => r.json()),
      fetch('data_announcements.json').then(r => r.json())
    ]);

    SCHEDULE_SLOTS = classesRes.schedule_slots;
    CASUAL_SPOTS = classesRes.casual_spots;
    ACADEMIC_ROOMS = classesRes.academic_rooms;

    AV = {};
    for (const [k, p] of Object.entries(usersRes.avatars)) {
      AV[k] = \`url('\${p}')\`;
    }

    FRIENDS_DATA = usersRes.friends;
    cards = ["create", ...meetsRes.map(m => ({
      id: m.id,
      t: m.title,
      o: m.openedBy,
      hostAv: m.hostAv,
      hostTag: m.hostTag,
      av: m.avatars,
      attendees: m.attendees,
      tags: m.tags,
      mine: m.mine
    }))];
    ANNOUNCEMENTS_DATA = annRes;
  } catch (err) {
    console.info("Using embedded fallbacks for file:/// offline access mode.");
    initFallbacks();
  }

  renderMeets(false);
  setupEvents();
  fit();
}

// Launch
loadData();
`;
fs.writeFileSync(path.join(__dirname, 'script.js'), jsContent, 'utf8');
console.log('Created script.js');

// 7. NONGKEE-MEETS.HTML (Clean Modular HTML)
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>nongkee – Open Meets, Kelas Kosong, Friends & Announcements</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div id="stage" class="stage">
  <!-- Header -->
  <header>
    <svg class="logo" id="homeLogo" width="98" height="72" viewBox="0 0 98 72" fill="none" stroke="#2ccf72" stroke-width="3.5" stroke-linecap="round">
      <circle cx="49" cy="37" r="30"/><circle cx="19" cy="37" r="7"/><circle cx="79" cy="37" r="7"/>
      <ellipse cx="49" cy="40" rx="20" ry="17"/><circle cx="41" cy="36" r="5" fill="#2ccf72"/><circle cx="57" cy="36" r="5" fill="#2ccf72"/>
      <path d="M43 48q6 5 12 0"/><path d="M36 9q13-9 26 0"/>
    </svg>
    <div class="word" id="homeWord">nongkee</div>
    <div class="who"><b>bian/varo</b><span>26/Zenith | CS</span></div>
    <div class="av me-av" data-av="me"></div>
  </header>

  <!-- Outer Guidelines Frame -->
  <div class="frame" id="fl"></div><div class="frame" id="fm"></div><div class="frame" id="fr"></div>

  <!-- Left Navigation Bar -->
  <nav>
    <!-- 1. Open Meets -->
    <div class="nav-item on" id="navMeets">
      <svg viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M5 18v2M19 18v2"/></svg>
      <div class="tooltip">Open Meets</div>
    </div>

    <!-- 2. Kelas Kosong -->
    <div class="nav-item" id="navRooms">
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <div class="tooltip">Kelas Kosong</div>
    </div>

    <!-- 3. Friends (Two People Icon) -->
    <div class="nav-item" id="navFriends">
      <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <div class="tooltip">Friends</div>
    </div>

    <!-- 4. Announcements (Broadcast Icon) -->
    <div class="nav-item" id="navAnnounce">
      <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      <div class="tooltip">Announcements</div>
    </div>
  </nav>

  <!-- VIEW 1: OPEN MEETS -->
  <div id="meetsView">
    <h1 class="view-title">Open Meets</h1>
    <div class="meets-tab-bar">
      <button class="tab-pill active" id="tabAllMeets">All Meets</button>
      <button class="tab-pill" id="tabMyMeets">My Meets</button>
    </div>
    <div id="grid"></div>
  </div>

  <!-- VIEW 2: KATALOG KELAS KOSONG -->
  <div id="roomsView">
    <h1 class="view-title">Katalog Ruangan Fasilkom UI</h1>
    
    <div class="room-view-controls">
      <div class="controls-top-row">
        <input type="text" class="room-search-input" id="roomSearchInput" placeholder="Cari nama ruangan (e.g. A6.10, Lab)...">
        <span id="dirAvailCount" style="font-size:15px;font-weight:700;color:var(--green);"></span>
      </div>

      <div class="time-row" id="viewDayFilter">
        <span style="font-size:13px;font-weight:700;color:#555;margin-right:4px;">HARI:</span>
        <button class="mini-pill" data-day="Senin">Senin</button>
        <button class="mini-pill active" data-day="Selasa">Selasa</button>
        <button class="mini-pill" data-day="Rabu">Rabu</button>
        <button class="mini-pill" data-day="Kamis">Kamis</button>
        <button class="mini-pill" data-day="Jumat">Jumat</button>
      </div>

      <div class="time-row" id="viewTimeFilter">
        <span style="font-size:13px;font-weight:700;color:#555;margin-right:4px;">WAKTU:</span>
        <button class="mini-pill" data-time="08:00-10:00">08:00 - 10:00</button>
        <button class="mini-pill active" data-time="10:00-12:00">10:00 - 12:00</button>
        <button class="mini-pill" data-time="13:00-15:00">13:00 - 15:00</button>
        <button class="mini-pill" data-time="15:00-17:00">15:00 - 17:00</button>
      </div>

      <div class="time-row" id="viewBuildingFilter">
        <span style="font-size:13px;font-weight:700;color:#555;margin-right:4px;">AREA:</span>
        <button class="mini-pill active" data-bld="Ged Baru">Gedung Baru</button>
        <button class="mini-pill" data-bld="Gd Lama">Gedung Lama</button>
        <button class="mini-pill" data-bld="Lab">Lab</button>
        <button class="mini-pill" data-bld="">Semua</button>
      </div>
    </div>

    <div id="roomsGrid"></div>
  </div>

  <!-- VIEW 3: FRIENDS (LIVE SCHEDULE STATUS & TWO PEOPLE ICON) -->
  <div id="friendsView">
    <h1 class="view-title">Friends in Pacil</h1>
    
    <div class="friends-controls">
      <div class="time-switcher-box">
        <span class="time-switcher-label">Campus Time:</span>
        <button class="mini-pill" data-clock="08:30">08:30</button>
        <button class="mini-pill active" data-clock="09:41">09:41 (Current)</button>
        <button class="mini-pill" data-clock="11:30">11:30</button>
        <button class="mini-pill" data-clock="13:30">13:30</button>
        <button class="mini-pill" data-clock="15:45">15:45</button>
      </div>

      <button class="friend-action-btn" id="openAddFriendBtn" style="background:var(--green);color:#fff;border-color:var(--green);">
        + Add Friend
      </button>
    </div>

    <div id="friendsGrid"></div>
  </div>

  <!-- VIEW 4: ANNOUNCEMENTS & BROADCASTS -->
  <div id="announceView">
    <h1 class="view-title">Pacil Announcements</h1>
    
    <div class="announce-controls">
      <div class="announce-pills" id="announceCatFilter">
        <button class="mini-pill active" data-cat="all">All Broadcasts</button>
        <button class="mini-pill" data-cat="team">Looking for Team</button>
        <button class="mini-pill" data-cat="promo">Promotions</button>
        <button class="mini-pill" data-cat="event">Campus Events</button>
      </div>

      <button class="post-announce-btn" id="openPostAnnounceBtn">
        + Post Announcement
      </button>
    </div>

    <div id="announceList"></div>
  </div>

  <div id="fade"></div>

  <!-- SCRIM -->
  <div id="scrim"></div>

  <!-- MODAL 1: MEET DETAILS (JOIN / LEAVE) -->
  <div id="modal">
    <button class="close-btn" id="closeDetailBtn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="m" id="mt">Django Discussion</div>
    <div class="m" id="ms">WebDev</div>
    <div class="m" id="mr">Room: Lab A1.01</div>
    <button id="btn">join</button>
    <div class="m" id="ma">attendees</div>
    <div id="att"></div>
    <div id="host"><div class="av big"></div><p>imanuel<sup>cs.26</sup></p></div>
  </div>

  <!-- MODAL 2: START A MEET -->
  <div id="createModal">
    <div class="modal-header">
      <div>
        <h2>Start a Meet</h2>
        <p>Choose an empty classroom or spot in Pacil to hang out or study</p>
      </div>
      <button class="close-btn" id="closeCreateBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="create-body">
      <!-- Left: Meet Details -->
      <div class="left-pane">
        <div class="field-group">
          <label class="field-label">Meet Title</label>
          <input type="text" class="input-txt" id="newTitle" placeholder="e.g. Belajar DAA bareng, PBP Sprint..." value="Study Session">
        </div>

        <div class="field-group">
          <label class="field-label">Topic / Category</label>
          <div class="topic-pills" id="topicPills">
            <span class="topic-pill active" data-val="Pacillian Studies">Pacillian Studies</span>
            <span class="topic-pill" data-val="WebDev">WebDev</span>
            <span class="topic-pill" data-val="GameDev">GameDev</span>
            <span class="topic-pill" data-val="AI / ML">AI / ML</span>
            <span class="topic-pill" data-val="MANBIS">MANBIS</span>
            <span class="topic-pill" data-val="Casual">Casual Nongkee</span>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Host</label>
          <div style="display:flex;align-items:center;gap:12px;background:#f9fcf8;border:1px solid #e5f2e0;border-radius:20px;padding:12px 16px;">
            <div class="av" style="width:56px;height:56px;background-image:url('avatars/avatar_bian.png')"></div>
            <div>
              <div style="font-size:16px;font-weight:700;color:#111;">Fabian Alvaro (bian/varo)</div>
              <div style="font-size:13px;color:var(--olive);font-weight:500;">Zenith CS '26 • You</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Live Room Picker -->
      <div class="right-pane">
        <div class="filter-bar">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;font-weight:700;color:#222;">CARI RUANGAN TERSEDIA</span>
            <span id="availCount" style="font-size:13px;font-weight:600;color:var(--olive);"></span>
          </div>

          <div class="time-row" id="createDayFilter">
            <span style="font-size:12px;font-weight:700;color:#666;margin-right:2px;">HARI:</span>
            <button class="mini-pill" data-day="Senin">Senin</button>
            <button class="mini-pill active" data-day="Selasa">Selasa</button>
            <button class="mini-pill" data-day="Rabu">Rabu</button>
            <button class="mini-pill" data-day="Kamis">Kamis</button>
            <button class="mini-pill" data-day="Jumat">Jumat</button>
          </div>

          <div class="time-row" id="createTimeFilter">
            <span style="font-size:12px;font-weight:700;color:#666;margin-right:2px;">WAKTU:</span>
            <button class="mini-pill" data-time="08:00-10:00">08:00 - 10:00</button>
            <button class="mini-pill active" data-time="10:00-12:00">10:00 - 12:00</button>
            <button class="mini-pill" data-time="13:00-15:00">13:00 - 15:00</button>
            <button class="mini-pill" data-time="15:00-17:00">15:00 - 17:00</button>
          </div>

          <div class="time-row" id="createBldFilter">
            <span style="font-size:12px;font-weight:700;color:#666;margin-right:2px;">AREA:</span>
            <button class="mini-pill active" data-bld="Ged Baru">Gedung Baru</button>
            <button class="mini-pill" data-bld="Gd Lama">Gedung Lama</button>
            <button class="mini-pill" data-bld="Lab">Lab</button>
            <button class="mini-pill" data-bld="Santai">Spot Santai</button>
            <button class="mini-pill" data-bld="">Semua</button>
          </div>
        </div>

        <div class="room-scroll-box" id="roomScrollBox"></div>
      </div>
    </div>

    <div class="create-bottom">
      <div class="selected-summary">
        <span>Selected Room:</span>
        <b id="summaryRoomName">Belum dipilih</b>
        <span id="summaryTimeBadge" style="font-size:13px;color:#777;">(Pilih dari daftar ruangan)</span>
      </div>
      <button class="launch-btn" id="launchMeetBtn">
        <span>Start Meet</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </div>

  <!-- MODAL 3: POST ANNOUNCEMENT -->
  <div id="createAnnounceModal">
    <div class="modal-header">
      <div>
        <h2>Post Announcement</h2>
        <p>Broadcast team openings, project promotions, or campus events</p>
      </div>
      <button class="close-btn" id="closeAnnounceModalBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="announce-form">
      <div class="field-group">
        <label class="field-label">Broadcast Title</label>
        <input type="text" class="input-txt" id="newAnnounceTitle" placeholder="e.g. Looking for 1 Frontend Dev (React) for COMPFEST">
      </div>

      <div class="field-group">
        <label class="field-label">Category</label>
        <div class="topic-pills" id="newAnnounceCatPills">
          <span class="topic-pill active" data-cat="team">Looking for Team</span>
          <span class="topic-pill" data-cat="promo">Promotions</span>
          <span class="topic-pill" data-cat="event">Campus Events</span>
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">Description / Information</label>
        <textarea class="announce-textarea" id="newAnnounceDesc" placeholder="Jelaskan kebutuhan tim, kriteria, atau info acara secara singkat..."></textarea>
      </div>

      <div class="field-group">
        <label class="field-label">Tags (separated by comma)</label>
        <input type="text" class="input-txt" id="newAnnounceTags" placeholder="e.g. Django, Hackathon, UI/UX" value="Django, Pacil">
      </div>

      <div style="display:flex;justify-content:flex-end;margin-top:8px;">
        <button class="launch-btn" id="publishAnnounceBtn">
          <span>Publish Broadcast</span>
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL 4: ADD FRIEND -->
  <div id="addFriendModal">
    <div class="modal-header">
      <div>
        <h2>Add Pacil Friend</h2>
        <p>Connect with your classmate to see their class schedules and location</p>
      </div>
      <button class="close-btn" id="closeAddFriendModalBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="announce-form" style="margin-top:24px;">
      <div class="field-group">
        <label class="field-label">Friend's Username or NPM</label>
        <input type="text" class="input-txt" id="newFriendInput" placeholder="e.g. username.ui or 2606859093">
      </div>

      <div style="display:flex;justify-content:flex-end;margin-top:24px;">
        <button class="launch-btn" id="submitAddFriendBtn">
          <span>Connect Friend</span>
        </button>
      </div>
    </div>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'nongkee-meets.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('Created nongkee-meets.html and index.html');
console.log('Successfully completed full modular separation!');
