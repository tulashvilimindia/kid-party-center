const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Configure axios with authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: API_TOKEN ? {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  }
});

function generateSlots() {
  const slots = [];
  const startDate = new Date('2025-12-08');
  const timeSlots = [
    { start: "10:00:00.000", end: "12:00:00.000" },
    { start: "12:30:00.000", end: "14:30:00.000" },
    { start: "15:00:00.000", end: "17:00:00.000" },
    { start: "17:30:00.000", end: "19:30:00.000" },
  ];

  for (let day = 0; day < 21; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];

    // Skip some Mondays (business closed)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 1 && Math.random() > 0.5) continue;

    // Add multiple time slots per day
    const slotsPerDay = dayOfWeek === 0 || dayOfWeek === 6 ? 4 : 3; // More slots on weekends

    for (let i = 0; i < slotsPerDay; i++) {
      const timeSlot = timeSlots[i];
      const rand = Math.random();
      let status, bookedParties;

      // Randomize booking status
      if (rand < 0.5) {
        status = "available";
        bookedParties = 0;
      } else if (rand < 0.8) {
        status = "limited";
        bookedParties = 1;
      } else {
        status = "booked";
        bookedParties = 2;
      }

      // Future dates more likely to be available
      if (day > 14) {
        status = "available";
        bookedParties = 0;
      }

      slots.push({
        date: dateStr,
        startTime: timeSlot.start,
        endTime: timeSlot.end,
        status: status,
        maxParties: 2,
        bookedParties: bookedParties
      });
    }
  }

  return slots;
}

async function importPartySlots() {
  console.log('🎉 Starting party slots import...\n');

  if (!API_TOKEN) {
    console.log('⚠️  WARNING: No API token found in environment variables');
    console.log('   Create .env file with: STRAPI_API_TOKEN=your_token_here\n');
  }

  const slots = generateSlots();
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const slot of slots) {
    try {
      // Check if slot already exists (by date and time)
      const existing = await api.get(
        `/party-slots?filters[date][$eq]=${slot.date}&filters[startTime][$eq]=${slot.startTime}`
      );

      if (existing.data.data && existing.data.data.length > 0) {
        skipCount++;
        continue;
      }

      // Create new party slot
      await api.post(`/party-slots`, { data: slot });
      console.log(`✅ Created slot for ${slot.date} ${slot.startTime.substring(0, 5)} (${slot.status})`);
      successCount++;

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`❌ Error creating slot for ${slot.date} ${slot.startTime}:`, error.response?.data?.error?.message || error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Created: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🎉 Total: ${slots.length}`);
  console.log('\n📋 Breakdown by status:');
  console.log(`   🟢 Available: ${slots.filter(s => s.status === 'available').length}`);
  console.log(`   🟡 Limited: ${slots.filter(s => s.status === 'limited').length}`);
  console.log(`   🔴 Booked: ${slots.filter(s => s.status === 'booked').length}\n`);
}

importPartySlots().catch(console.error);
