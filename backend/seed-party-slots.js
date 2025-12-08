const slots = [];

// Generate slots for next 3 weeks (21 days)
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

console.log('🎉 Party Slots data ready to import');
console.log(`Total slots: ${slots.length}`);
console.log(`- Available: ${slots.filter(s => s.status === 'available').length}`);
console.log(`- Limited: ${slots.filter(s => s.status === 'limited').length}`);
console.log(`- Booked: ${slots.filter(s => s.status === 'booked').length}`);
console.log('\nTo import via Strapi Admin:');
console.log('1. Go to http://localhost:1337/admin');
console.log('2. Navigate to Content Manager > Party Slot');
console.log('3. Create entries manually or use the data below\n');
console.log(JSON.stringify(slots, null, 2));
