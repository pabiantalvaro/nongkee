const fs = require('fs');
const path = require('path');

const slots = JSON.parse(fs.readFileSync(path.join(__dirname, 'schedule_slots.json'), 'utf8'));
console.log('Read slots count:', slots.length);
