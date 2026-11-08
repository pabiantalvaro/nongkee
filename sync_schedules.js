const fs = require('fs');
const path = require('path');

const REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhYTk5NzUzZS1mYjJjLTQ4OTAtOTQzYS04NjAzMmU2NmI1NjIifQ.eyJleHAiOjE3OTM2Njk5NTMsImlhdCI6MTc5MzY2ODA5MywianRpIjoiOWFmMzdlN2MtOTMyYi00NDc1LWI1NzctZDgwMDNiMzEzYzc2IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi51aS5hYy5pZC9yZWFsbXMvbWFpbiIsImF1ZCI6Imh0dHBzOi8vbG9naW4udWkuYWMuaWQvcmVhbG1zL21haW4iLCJzdWIiOiI2MDc2MzNkMi03MWY1LTQ5NzMtYjgxNS1hODMxMTRmYmFjYzIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoic2xjbS1ha2FkZW1payIsIm5vbmNlIjoiMjAyNWFlODItYjZjYy00ZDczLWI2NzUtYjE2Y2M4ZmFlOTAyIiwic2Vzc2lvbl9zdGF0ZSI6IjQ1MDg4M2I4LTc0MWMtNDE1NC04YmRlLTkzMGM1NzVlMTMxZiIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0NTA4ODNiOC03NDFjLTQxNTQtOGJkZS05MzBjNTc1ZTEzMWYifQ.M5M7Zp-08g6QOL1yknJXal5T6yuVWjW_XyCuk07E804';

async function fetchAllData() {
  console.log('1. Refreshing Keycloak access token...');
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: 'slcm-akademik',
    refresh_token: REFRESH_TOKEN
  });

  const tokenRes = await (await fetch('https://login.ui.ac.id/realms/main/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0' },
    body: params.toString()
  })).json();

  if (!tokenRes.access_token) {
    throw new Error('Failed to refresh token: ' + JSON.stringify(tokenRes));
  }
  const token = tokenRes.access_token;

  console.log('2. Fetching SATU xAppToken...');
  const userRes = await (await fetch('https://slcm.ui.ac.id/akademik/api/user', {
    headers: { 'Authorization': 'Bearer ' + token, 'User-Agent': 'Mozilla/5.0' }
  })).json();

  const xAppToken = userRes.data.userToken;
  const headers = {
    'Authorization': 'Bearer ' + token,
    'X-App-Token': xAppToken,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0'
  };

  console.log('3. Downloading all UI rooms...');
  const roomsRes = await (await fetch('https://slcm.ui.ac.id/akademik/api/v1/room', { headers })).json();
  const allRooms = roomsRes.data || [];
  fs.writeFileSync(path.join(__dirname, 'all_ui_rooms.json'), JSON.stringify(allRooms, null, 2));
  console.log(`Saved ${allRooms.length} rooms to all_ui_rooms.json`);

  console.log('4. Downloading class schedules (internal, group, external)...');
  const allClasses = [];
  for (const type of ['internal', 'group', 'external']) {
    const url = `https://slcm.ui.ac.id/akademik/api/v1/class/table?type=${type}&year=2026&term=1&lang=id`;
    const res = await (await fetch(url, { headers })).json();
    if (res.data) {
      console.log(` - Fetched ${res.data.length} ${type} classes`);
      allClasses.push(...res.data);
    }
  }

  // Parse schedules into structured booked slots
  const parsedSlots = [];
  for (const c of allClasses) {
    if (c.dates_rooms && Array.isArray(c.dates_rooms)) {
      for (const dr of c.dates_rooms) {
        const m = dr.match(/^([^,]+),\s*([0-9]{1,2})[:.]([0-9]{2})\s*-\s*([0-9]{1,2})[:.]([0-9]{2})\s*\((.*)\)$/);
        if (m) {
          const [_, day, h1, m1, h2, m2, room] = m;
          const start = `${h1.padStart(2, '0')}:${m1}`;
          const end = `${h2.padStart(2, '0')}:${m2}`;
          parsedSlots.push({
            course_code: c.coursecode,
            course_name: c.coursename,
            class_name: c.classname,
            lecturers: c.lecturers || [],
            day: day.trim(),
            start_time: start,
            end_time: end,
            room: room.trim(),
            org_code: c.orgcode
          });
        }
      }
    }
  }

  fs.writeFileSync(path.join(__dirname, 'classes_raw.json'), JSON.stringify(allClasses, null, 2));
  fs.writeFileSync(path.join(__dirname, 'schedule_slots.json'), JSON.stringify(parsedSlots, null, 2));

  console.log(`\nSuccessfully downloaded:`);
  console.log(`- ${allClasses.length} total classes saved to classes_raw.json`);
  console.log(`- ${parsedSlots.length} parsed time slots saved to schedule_slots.json`);
}

fetchAllData().catch(console.error);
