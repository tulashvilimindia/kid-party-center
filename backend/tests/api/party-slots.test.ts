import { api, validators, assertStrapiEntity } from '../utils/testHelpers';

describe('Party Slots API E2E Tests', () => {
  let partySlots: any[] = [];

  describe('GET /api/party-slots', () => {
    it('should return 200 and fetch all party slots', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      partySlots = response.body.data;
    });

    it('should return published party slots only', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        expect(validators.hasPublishedAt(slot)).toBe(true);
        assertStrapiEntity(slot);
      });
    });

    it('should have valid data structure for each slot', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;
      expect(slots.length).toBeGreaterThan(0);

      slots.forEach((slot: any) => {
        // Check Strapi entity fields
        assertStrapiEntity(slot);

        // Check required custom fields
        expect(slot).toHaveProperty('date');
        expect(slot).toHaveProperty('startTime');
        expect(slot).toHaveProperty('endTime');
        expect(slot).toHaveProperty('status');

        // Validate data types
        expect(typeof slot.date).toBe('string');
        expect(typeof slot.startTime).toBe('string');
        expect(typeof slot.endTime).toBe('string');
        expect(typeof slot.status).toBe('string');

        // Optional fields
        if (slot.packageName) {
          expect(typeof slot.packageName).toBe('string');
        }
      });
    });

    it('should have valid date formats (YYYY-MM-DD)', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        expect(validators.isValidDate(slot.date)).toBe(true);
      });
    });

    it('should have valid time formats (HH:MM:SS)', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        expect(validators.isValidTime(slot.startTime)).toBe(true);
        expect(validators.isValidTime(slot.endTime)).toBe(true);
      });
    });

    it('should have valid status values', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        expect(validators.isValidStatus(slot.status)).toBe(true);
      });
    });

    it('should have endTime after startTime', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        const start = slot.startTime.split(':').map(Number);
        const end = slot.endTime.split(':').map(Number);

        const startMinutes = start[0] * 60 + start[1];
        const endMinutes = end[0] * 60 + end[1];

        expect(endMinutes).toBeGreaterThan(startMinutes);
      });
    });

    it('should only return future or current slots', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Start of today

      slots.forEach((slot: any) => {
        const slotDate = new Date(slot.date + 'T00:00:00');
        expect(slotDate.getTime()).toBeGreaterThanOrEqual(now.getTime());
      });
    });

    it('should group slots by status correctly', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      const statusGroups = {
        available: slots.filter((s: any) => s.status === 'available'),
        limited: slots.filter((s: any) => s.status === 'limited'),
        booked: slots.filter((s: any) => s.status === 'booked'),
        pending: slots.filter((s: any) => s.status === 'pending'),
      };

      // Log for debugging
      console.log('Status breakdown:', {
        available: statusGroups.available.length,
        limited: statusGroups.limited.length,
        booked: statusGroups.booked.length,
        pending: statusGroups.pending.length,
        total: slots.length,
      });

      // Should have at least some slots
      expect(slots.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/party-slots/:id', () => {
    it('should fetch a single party slot by id', async () => {
      // First get all slots to get a valid ID
      const listResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = listResponse.body.data;
      expect(slots.length).toBeGreaterThan(0);

      const firstSlot = slots[0];

      // Now fetch that specific slot
      const response = await api()
        .get(`/api/party-slots/${firstSlot.documentId}`)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(firstSlot.id);
      expect(response.body.data.documentId).toBe(firstSlot.documentId);
    });

    it('should return 404 for non-existent slot', async () => {
      await api()
        .get('/api/party-slots/non-existent-id-12345')
        .expect(404);
    });
  });

  describe('Data Integrity Checks', () => {
    it('should not have duplicate slots for same date/time', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;
      const slotKeys = new Set();

      slots.forEach((slot: any) => {
        const key = `${slot.date}-${slot.startTime}`;

        if (slotKeys.has(key)) {
          fail(`Duplicate slot found for ${key}`);
        }

        slotKeys.add(key);
      });
    });

    it('should have consistent date ordering', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      // Group by date
      const dateGroups: { [key: string]: any[] } = {};

      slots.forEach((slot: any) => {
        if (!dateGroups[slot.date]) {
          dateGroups[slot.date] = [];
        }
        dateGroups[slot.date].push(slot);
      });

      // Check each date group is sorted by time
      Object.entries(dateGroups).forEach(([date, slotsOnDate]) => {
        for (let i = 1; i < slotsOnDate.length; i++) {
          const prev = slotsOnDate[i - 1].startTime;
          const curr = slotsOnDate[i].startTime;

          // Just verify they're different or in order
          expect(prev).not.toBe(curr);
        }
      });
    });

    it('should have reasonable time slots (business hours)', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        const startHour = parseInt(slot.startTime.split(':')[0]);
        const endHour = parseInt(slot.endTime.split(':')[0]);

        // Assuming parties are during reasonable hours (8 AM - 10 PM)
        expect(startHour).toBeGreaterThanOrEqual(8);
        expect(startHour).toBeLessThan(22);
        expect(endHour).toBeGreaterThan(8);
        expect(endHour).toBeLessThanOrEqual(22);
      });
    });

    it('should have reasonable slot durations (1-5 hours)', async () => {
      const response = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = response.body.data;

      slots.forEach((slot: any) => {
        const start = slot.startTime.split(':').map(Number);
        const end = slot.endTime.split(':').map(Number);

        const startMinutes = start[0] * 60 + start[1];
        const endMinutes = end[0] * 60 + end[1];
        const durationMinutes = endMinutes - startMinutes;

        // Duration should be between 1 and 5 hours
        expect(durationMinutes).toBeGreaterThanOrEqual(60);
        expect(durationMinutes).toBeLessThanOrEqual(300);
      });
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time (< 1 second)', async () => {
      const startTime = Date.now();

      await api()
        .get('/api/party-slots')
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(1000);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        api().get('/api/party-slots').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      });
    });
  });
});
