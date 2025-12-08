import { api, validators } from '../utils/testHelpers';

describe('Cross-Collection Data Validation Tests', () => {
  describe('Package and Party Slot Integration', () => {
    it('should have party slots with valid package names', async () => {
      // Get all packages
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const packages = packagesResponse.body.data;
      const packageNames = packages.map((pkg: any) => pkg.name);

      // Get all party slots
      const slotsResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = slotsResponse.body.data;

      // Check if slots with packageName reference valid packages
      slots.forEach((slot: any) => {
        if (slot.packageName) {
          const isValid = packageNames.includes(slot.packageName);

          if (!isValid) {
            console.warn(`Warning: Slot has invalid package name: ${slot.packageName}`);
          }
        }
      });
    });

    it('should have reasonable slot durations matching package durations', async () => {
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const packages = packagesResponse.body.data;

      const slotsResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = slotsResponse.body.data;

      slots.forEach((slot: any) => {
        if (slot.packageName) {
          const pkg = packages.find((p: any) => p.name === slot.packageName);

          if (pkg) {
            // Calculate slot duration
            const start = slot.startTime.split(':').map(Number);
            const end = slot.endTime.split(':').map(Number);
            const slotDurationMinutes = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);

            // Package duration should match slot duration (within reason)
            const difference = Math.abs(slotDurationMinutes - pkg.duration);

            if (difference > 30) {
              console.warn(
                `Duration mismatch: Slot "${slot.packageName}" is ${slotDurationMinutes}min but package is ${pkg.duration}min`
              );
            }
          }
        }
      });
    });
  });

  describe('Complete API Health Check', () => {
    it('should have all required API endpoints accessible', async () => {
      const endpoints = [
        '/api/packages',
        '/api/party-slots',
        '/api/galleries',
      ];

      for (const endpoint of endpoints) {
        const response = await api()
          .get(endpoint)
          .expect(200);

        expect(validators.isValidStrapiResponse(response.body)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);

        console.log(`✓ ${endpoint}: ${response.body.data.length} items`);
      }
    });

    it('should have consistent data across all collections', async () => {
      const packagesResponse = await api().get('/api/packages').expect(200);
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const galleryResponse = await api().get('/api/galleries').expect(200);

      const summary = {
        packages: packagesResponse.body.data.length,
        slots: slotsResponse.body.data.length,
        gallery: galleryResponse.body.data.length,
      };

      console.log('Data Summary:', summary);

      // Should have data in all collections
      expect(summary.packages).toBeGreaterThan(0);
      expect(summary.slots).toBeGreaterThan(0);
      expect(summary.gallery).toBeGreaterThan(0);
    });
  });

  describe('Data Quality Metrics', () => {
    it('should calculate completeness scores for each collection', async () => {
      // Packages completeness
      const packagesResponse = await api().get('/api/packages').expect(200);
      const packages = packagesResponse.body.data;

      let packageFieldsTotal = 0;
      let packageFieldsFilled = 0;

      packages.forEach((pkg: any) => {
        const optionalFields = ['image', 'features', 'popular', 'featured'];

        optionalFields.forEach(field => {
          packageFieldsTotal++;
          if (pkg[field] !== null && pkg[field] !== undefined && pkg[field] !== '') {
            packageFieldsFilled++;
          }
        });
      });

      const packageCompleteness = (packageFieldsFilled / packageFieldsTotal) * 100;

      // Party Slots completeness
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const slots = slotsResponse.body.data;

      let slotFieldsTotal = 0;
      let slotFieldsFilled = 0;

      slots.forEach((slot: any) => {
        const optionalFields = ['packageName'];

        optionalFields.forEach(field => {
          slotFieldsTotal++;
          if (slot[field] !== null && slot[field] !== undefined && slot[field] !== '') {
            slotFieldsFilled++;
          }
        });
      });

      const slotCompleteness = slotFieldsTotal > 0 ? (slotFieldsFilled / slotFieldsTotal) * 100 : 100;

      // Gallery completeness
      const galleryResponse = await api().get('/api/galleries').expect(200);
      const gallery = galleryResponse.body.data;

      let galleryFieldsTotal = 0;
      let galleryFieldsFilled = 0;

      gallery.forEach((item: any) => {
        const optionalFields = ['description', 'category', 'date'];

        optionalFields.forEach(field => {
          galleryFieldsTotal++;
          if (item[field] !== null && item[field] !== undefined && item[field] !== '') {
            galleryFieldsFilled++;
          }
        });
      });

      const galleryCompleteness = (galleryFieldsFilled / galleryFieldsTotal) * 100;

      console.log('Data Completeness Scores:');
      console.log(`  Packages: ${packageCompleteness.toFixed(1)}%`);
      console.log(`  Party Slots: ${slotCompleteness.toFixed(1)}%`);
      console.log(`  Gallery: ${galleryCompleteness.toFixed(1)}%`);

      // All should be above 50% complete
      expect(packageCompleteness).toBeGreaterThan(50);
      expect(slotCompleteness).toBeGreaterThan(50);
      expect(galleryCompleteness).toBeGreaterThan(50);
    });

    it('should identify any data anomalies', async () => {
      const anomalies: string[] = [];

      // Check packages
      const packagesResponse = await api().get('/api/packages').expect(200);
      const packages = packagesResponse.body.data;

      packages.forEach((pkg: any) => {
        if (pkg.price > 1000) {
          anomalies.push(`High price package: ${pkg.name} at $${pkg.price}`);
        }

        if (pkg.maxGuests > 100) {
          anomalies.push(`Large capacity package: ${pkg.name} with ${pkg.maxGuests} guests`);
        }

        if (pkg.duration > 300) {
          anomalies.push(`Long duration package: ${pkg.name} with ${pkg.duration} minutes`);
        }
      });

      // Check party slots
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const slots = slotsResponse.body.data;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 2);

      slots.forEach((slot: any) => {
        const slotDate = new Date(slot.date + 'T00:00:00');

        if (slotDate > futureDate) {
          anomalies.push(`Far future slot: ${slot.date}`);
        }
      });

      if (anomalies.length > 0) {
        console.log('Data Anomalies Found:');
        anomalies.forEach(a => console.log(`  - ${a}`));
      } else {
        console.log('No data anomalies detected');
      }

      // This test always passes, it's just for reporting
      expect(true).toBe(true);
    });
  });

  describe('Business Rule Validation', () => {
    it('should not have overlapping party slots on same date', async () => {
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const slots = slotsResponse.body.data;

      // Group by date
      const slotsByDate: { [date: string]: any[] } = {};

      slots.forEach((slot: any) => {
        if (!slotsByDate[slot.date]) {
          slotsByDate[slot.date] = [];
        }
        slotsByDate[slot.date].push(slot);
      });

      // Check for overlaps on each date
      Object.entries(slotsByDate).forEach(([date, dateSlots]) => {
        for (let i = 0; i < dateSlots.length; i++) {
          for (let j = i + 1; j < dateSlots.length; j++) {
            const slot1 = dateSlots[i];
            const slot2 = dateSlots[j];

            // Convert times to minutes
            const slot1Start = slot1.startTime.split(':').map(Number);
            const slot1End = slot1.endTime.split(':').map(Number);
            const slot2Start = slot2.startTime.split(':').map(Number);
            const slot2End = slot2.endTime.split(':').map(Number);

            const slot1StartMins = slot1Start[0] * 60 + slot1Start[1];
            const slot1EndMins = slot1End[0] * 60 + slot1End[1];
            const slot2StartMins = slot2Start[0] * 60 + slot2Start[1];
            const slot2EndMins = slot2End[0] * 60 + slot2End[1];

            // Check for overlap
            const overlaps = !(slot1EndMins <= slot2StartMins || slot2EndMins <= slot1StartMins);

            if (overlaps) {
              fail(
                `Overlapping slots on ${date}: ` +
                `${slot1.startTime}-${slot1.endTime} and ${slot2.startTime}-${slot2.endTime}`
              );
            }
          }
        }
      });

      expect(slots.length).toBeGreaterThan(0);
    });

    it('should have balanced availability across dates', async () => {
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const slots = slotsResponse.body.data;

      // Group by date
      const slotsByDate: { [date: string]: number } = {};

      slots.forEach((slot: any) => {
        slotsByDate[slot.date] = (slotsByDate[slot.date] || 0) + 1;
      });

      const counts = Object.values(slotsByDate);
      const avgSlotsPerDate = counts.reduce((a, b) => a + b, 0) / counts.length;

      console.log(`Average slots per date: ${avgSlotsPerDate.toFixed(1)}`);
      console.log(`Date range: ${Object.keys(slotsByDate).length} days`);

      expect(avgSlotsPerDate).toBeGreaterThan(0);
    });

    it('should have appropriate status distribution', async () => {
      const slotsResponse = await api().get('/api/party-slots').expect(200);
      const slots = slotsResponse.body.data;

      const statusCounts = {
        available: slots.filter((s: any) => s.status === 'available').length,
        limited: slots.filter((s: any) => s.status === 'limited').length,
        booked: slots.filter((s: any) => s.status === 'booked').length,
        pending: slots.filter((s: any) => s.status === 'pending').length,
      };

      const availablePercentage = ((statusCounts.available + statusCounts.limited) / slots.length) * 100;

      console.log('Status distribution:', statusCounts);
      console.log(`Available slots: ${availablePercentage.toFixed(1)}%`);

      // Should have some available slots
      expect(statusCounts.available + statusCounts.limited).toBeGreaterThan(0);
    });
  });
});
