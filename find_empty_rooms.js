const fs = require('fs');
const path = require('path');

// Load datasets
const scheduleSlots = JSON.parse(fs.readFileSync(path.join(__dirname, 'schedule_slots.json'), 'utf8'));

// Extract all known rooms that appear in the schedule
const knownRooms = [...new Set(scheduleSlots.map(s => s.room))].sort();

/**
 * Check if two time ranges overlap
 * e.g., "10:00"-"11:40" overlaps with "11:00"-"12:00"
 */
function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function isOverlapping(startA, endA, startB, endB) {
  const a1 = timeToMinutes(startA);
  const a2 = timeToMinutes(endA);
  const b1 = timeToMinutes(startB);
  const b2 = timeToMinutes(endB);
  return Math.max(a1, b1) < Math.min(a2, b2);
}

/**
 * Find empty rooms for a given day and time range
 * @param {string} day e.g. "Senin", "Selasa", "Rabu", "Kamis", "Jumat"
 * @param {string} startTime e.g. "10:00"
 * @param {string} endTime e.g. "12:00"
 * @param {string} [roomFilter] optional substring filter, e.g. "Ged Baru", "Lab"
 */
function findEmptyRooms(day, startTime, endTime, roomFilter = '') {
  // Normalize day
  const normalizedDay = day.trim().toLowerCase();

  // Find all rooms occupied during this time window
  const occupied = new Map();

  for (const slot of scheduleSlots) {
    if (slot.day.toLowerCase() === normalizedDay) {
      if (isOverlapping(startTime, endTime, slot.start_time, slot.end_time)) {
        occupied.set(slot.room, slot);
      }
    }
  }

  // Filter target candidate rooms
  const candidates = roomFilter 
    ? knownRooms.filter(r => r.toLowerCase().includes(roomFilter.toLowerCase()))
    : knownRooms;

  const empty = [];
  const booked = [];

  for (const r of candidates) {
    if (occupied.has(r)) {
      booked.push({ room: r, occupiedBy: occupied.get(r) });
    } else {
      empty.push(r);
    }
  }

  return {
    day,
    timeRange: `${startTime} - ${endTime}`,
    filter: roomFilter || 'All',
    totalCandidateRooms: candidates.length,
    emptyCount: empty.length,
    emptyRooms: empty,
    bookedCount: booked.length,
    bookedRooms: booked
  };
}

// CLI usage: node find_empty_rooms.js <Day> <StartTime> <EndTime> [Filter]
// Example: node find_empty_rooms.js Selasa 10:00 12:00 "Ged Baru"
if (require.main === module) {
  const args = process.argv.slice(2);
  const day = args[0] || 'Selasa';
  const start = args[1] || '13:00';
  const end = args[2] || '15:00';
  const filter = args[3] || '';

  const res = findEmptyRooms(day, start, end, filter);
  console.log(`\n======================================================`);
  console.log(`  KATALOG KELAS KOSONG (UI CLASSROOM FINDER)`);
  console.log(`======================================================`);
  console.log(`Hari        : ${res.day}`);
  console.log(`Waktu       : ${res.timeRange}`);
  console.log(`Filter Ruang: ${res.filter}`);
  console.log(`------------------------------------------------------`);
  console.log(`TOTAL RUANG TERSEDIA (KOSONG): ${res.emptyCount} / ${res.totalCandidateRooms}`);
  console.log(`------------------------------------------------------`);

  res.emptyRooms.forEach((r, i) => {
    console.log(` [✓] ${r}`);
  });

  if (res.bookedCount > 0) {
    console.log(`\n------------------------------------------------------`);
    console.log(`RUANG YANG SEDANG DIGUNAKAN (${res.bookedCount}):`);
    console.log(`------------------------------------------------------`);
    res.bookedRooms.forEach(b => {
      const s = b.occupiedBy;
      console.log(` [X] ${b.room}`);
      console.log(`     ↳ ${s.course_name} (${s.class_name}) [${s.start_time} - ${s.end_time}]`);
    });
  }
}

module.exports = { findEmptyRooms };
