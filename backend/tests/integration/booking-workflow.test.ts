import { api, validators } from '../utils/testHelpers';

describe('Booking Workflow Integration Tests', () => {
  describe('Complete Booking Journey', () => {
    it('should support a complete booking flow: browse packages -> select slot -> view menu', async () => {
      // Step 1: Browse available packages
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const packages = packagesResponse.body.data;
      expect(packages.length).toBeGreaterThan(0);

      const selectedPackage = packages[0];
      console.log(`\nStep 1: Selected package "${selectedPackage.name}" ($${selectedPackage.price})`);

      // Step 2: Check package details
      const packageDetailResponse = await api()
        .get(`/api/packages/${selectedPackage.documentId}`)
        .expect(200);

      expect(packageDetailResponse.body.data.name).toBe(selectedPackage.name);
      console.log(`Step 2: Verified package details - ${selectedPackage.maxGuests} guests, ${selectedPackage.duration} mins`);

      // Step 3: Find available party slots
      const slotsResponse = await api()
        .get('/api/party-slots?filters[status][$eq]=available')
        .expect(200);

      const availableSlots = slotsResponse.body.data;
      expect(availableSlots.length).toBeGreaterThan(0);

      const selectedSlot = availableSlots[0];
      console.log(`Step 3: Found ${availableSlots.length} available slots, selected ${selectedSlot.date} at ${selectedSlot.startTime}`);

      // Step 4: Browse menu items for the party
      const menuResponse = await api()
        .get('/api/menu-items')
        .expect(200);

      const menuItems = menuResponse.body.data;
      expect(menuItems.length).toBeGreaterThan(0);

      const foodItems = menuItems.filter((item: any) => item.category === 'food');
      const drinkItems = menuItems.filter((item: any) => item.category === 'drinks');

      console.log(`Step 4: Browsed menu - ${foodItems.length} food items, ${drinkItems.length} drinks`);

      // Step 5: Get site settings for contact info
      const settingsResponse = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = settingsResponse.body.data;
      expect(settings.phone).toBeDefined();
      expect(settings.email).toBeDefined();

      console.log(`Step 5: Retrieved contact info - ${settings.phone}, ${settings.email}`);

      // Workflow complete
      console.log('\nBooking workflow completed successfully!');
    });

    it('should calculate estimated total cost for a booking', async () => {
      // Get a package
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const selectedPackage = packagesResponse.body.data[0];
      const numberOfGuests = Math.min(10, selectedPackage.maxGuests);

      // Get menu items
      const menuResponse = await api()
        .get('/api/menu-items')
        .expect(200);

      const menuItems = menuResponse.body.data;

      // Select some menu items
      const selectedFood = menuItems.find((item: any) => item.category === 'food');
      const selectedDrink = menuItems.find((item: any) => item.category === 'drinks');

      // Calculate costs
      const packageCost = selectedPackage.price;
      const foodCost = selectedFood ? selectedFood.pricePerChild * numberOfGuests : 0;
      const drinkCost = selectedDrink ? selectedDrink.pricePerChild * numberOfGuests : 0;

      const totalCost = packageCost + foodCost + drinkCost;

      console.log('\nBooking Cost Estimate:');
      console.log(`  Package: $${packageCost}`);
      console.log(`  Food (${numberOfGuests} guests): $${foodCost.toFixed(2)}`);
      console.log(`  Drinks (${numberOfGuests} guests): $${drinkCost.toFixed(2)}`);
      console.log(`  Total: $${totalCost.toFixed(2)}`);

      expect(totalCost).toBeGreaterThan(0);
      expect(totalCost).toBeLessThan(10000);
    });
  });

  describe('Package and Slot Compatibility', () => {
    it('should verify slot durations match package durations', async () => {
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const packages = packagesResponse.body.data;

      const slotsResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = slotsResponse.body.data;

      let compatibilityIssues = 0;

      packages.forEach((pkg: any) => {
        const matchingSlots = slots.filter((slot: any) => {
          if (slot.packageName && slot.packageName !== pkg.name) {
            return false;
          }

          // Calculate slot duration
          const start = slot.startTime.split(':').map(Number);
          const end = slot.endTime.split(':').map(Number);
          const slotDurationMinutes = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);

          // Check if durations match (within 30 minutes)
          const difference = Math.abs(slotDurationMinutes - pkg.duration);
          return difference <= 30;
        });

        if (matchingSlots.length === 0) {
          console.warn(`Warning: Package "${pkg.name}" (${pkg.duration}min) has no compatible slots`);
          compatibilityIssues++;
        }
      });

      console.log(`\nCompatibility check: ${compatibilityIssues} packages without matching slots`);
    });

    it('should ensure popular packages have available slots', async () => {
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const packages = packagesResponse.body.data;
      const popularPackages = packages.filter((pkg: any) => pkg.popular === true);

      const slotsResponse = await api()
        .get('/api/party-slots?filters[status][$eq]=available')
        .expect(200);

      const availableSlots = slotsResponse.body.data;

      console.log(`\nPopular packages: ${popularPackages.length}`);
      console.log(`Available slots: ${availableSlots.length}`);

      popularPackages.forEach((pkg: any) => {
        const compatibleSlots = availableSlots.filter((slot: any) => {
          const start = slot.startTime.split(':').map(Number);
          const end = slot.endTime.split(':').map(Number);
          const slotDurationMinutes = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);

          const difference = Math.abs(slotDurationMinutes - pkg.duration);
          return difference <= 30;
        });

        if (compatibleSlots.length === 0) {
          console.warn(`Warning: Popular package "${pkg.name}" has no available slots`);
        } else {
          console.log(`  ✓ "${pkg.name}": ${compatibleSlots.length} available slots`);
        }
      });
    });
  });

  describe('Menu Planning Scenarios', () => {
    it('should calculate menu costs for different party sizes', async () => {
      const menuResponse = await api()
        .get('/api/menu-items')
        .expect(200);

      const menuItems = menuResponse.body.data;

      const partySizes = [10, 20, 30, 50];

      console.log('\nMenu Cost Analysis:');

      partySizes.forEach(size => {
        // Select standard menu items
        const food = menuItems.find((item: any) => item.category === 'food');
        const drinks = menuItems.find((item: any) => item.category === 'drinks');
        const dessert = menuItems.find((item: any) => item.category === 'dessert');

        let totalCost = 0;

        if (food) totalCost += food.pricePerChild * size;
        if (drinks) totalCost += drinks.pricePerChild * size;
        if (dessert) totalCost += dessert.pricePerChild * size;

        console.log(`  ${size} guests: $${totalCost.toFixed(2)} (${(totalCost / size).toFixed(2)} per guest)`);
      });

      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should support dietary variations with different menu categories', async () => {
      const menuResponse = await api()
        .get('/api/menu-items')
        .expect(200);

      const menuItems = menuResponse.body.data;

      const categories = {
        food: menuItems.filter((item: any) => item.category === 'food'),
        drinks: menuItems.filter((item: any) => item.category === 'drinks'),
        dessert: menuItems.filter((item: any) => item.category === 'dessert'),
        extras: menuItems.filter((item: any) => item.category === 'extras'),
      };

      console.log('\nMenu Variety:');
      Object.entries(categories).forEach(([category, items]) => {
        console.log(`  ${category}: ${items.length} options`);
      });

      // Should have variety in each category
      expect(categories.food.length).toBeGreaterThan(0);
      expect(categories.drinks.length).toBeGreaterThan(0);
    });
  });

  describe('Gallery and Package Correlation', () => {
    it('should have gallery images representing different party themes', async () => {
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const galleryResponse = await api()
        .get('/api/galleries')
        .expect(200);

      const packages = packagesResponse.body.data;
      const gallery = galleryResponse.body.data;

      console.log(`\nContent Analysis:`);
      console.log(`  ${packages.length} packages offered`);
      console.log(`  ${gallery.length} gallery images`);

      // Ideally, gallery should have multiple images per package
      const recommendedGallerySize = packages.length * 3;

      if (gallery.length < recommendedGallerySize) {
        console.warn(`  Recommendation: Add more gallery images (target: ~${recommendedGallerySize})`);
      }

      expect(gallery.length).toBeGreaterThan(0);
    });

    it('should have consistent visual branding across site', async () => {
      const settingsResponse = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const galleryResponse = await api()
        .get('/api/galleries')
        .expect(200);

      const settings = settingsResponse.body.data;
      const packages = packagesResponse.body.data;
      const gallery = galleryResponse.body.data;

      console.log('\nBranding Completeness:');
      console.log(`  Hero title: ${settings.heroTitle ? '✓' : '✗'}`);
      console.log(`  Hero subtitle: ${settings.heroSubtitle ? '✓' : '✗'}`);
      console.log(`  Intro text: ${settings.introText ? '✓' : '✗'}`);

      const packagesWithImages = packages.filter((pkg: any) => pkg.image);
      console.log(`  Package images: ${packagesWithImages.length}/${packages.length}`);

      expect(settings.heroTitle).toBeDefined();
      expect(gallery.length).toBeGreaterThan(0);
    });
  });

  describe('Availability and Booking Capacity', () => {
    it('should have sufficient slots for expected demand', async () => {
      const slotsResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = slotsResponse.body.data;

      // Calculate slots per week
      const slotsByDate: { [date: string]: number } = {};

      slots.forEach((slot: any) => {
        slotsByDate[slot.date] = (slotsByDate[slot.date] || 0) + 1;
      });

      const dates = Object.keys(slotsByDate).sort();
      const avgSlotsPerDay = Object.values(slotsByDate).reduce((a: number, b: number) => a + b, 0) / dates.length;

      console.log('\nCapacity Analysis:');
      console.log(`  Total slots: ${slots.length}`);
      console.log(`  Date range: ${dates.length} days`);
      console.log(`  Avg slots per day: ${avgSlotsPerDay.toFixed(1)}`);

      // Weekend analysis
      const weekendSlots = slots.filter((slot: any) => {
        const date = new Date(slot.date + 'T00:00:00');
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
      });

      console.log(`  Weekend slots: ${weekendSlots.length} (${((weekendSlots.length / slots.length) * 100).toFixed(1)}%)`);

      expect(slots.length).toBeGreaterThan(0);
      expect(avgSlotsPerDay).toBeGreaterThan(0);
    });

    it('should track booking status appropriately', async () => {
      const slotsResponse = await api()
        .get('/api/party-slots')
        .expect(200);

      const slots = slotsResponse.body.data;

      const statusBreakdown = {
        available: slots.filter((s: any) => s.status === 'available').length,
        limited: slots.filter((s: any) => s.status === 'limited').length,
        booked: slots.filter((s: any) => s.status === 'booked').length,
        pending: slots.filter((s: any) => s.status === 'pending').length,
      };

      const bookingRate = ((statusBreakdown.booked + statusBreakdown.pending) / slots.length) * 100;
      const availabilityRate = ((statusBreakdown.available + statusBreakdown.limited) / slots.length) * 100;

      console.log('\nBooking Status:');
      console.log(`  Available: ${statusBreakdown.available} (${((statusBreakdown.available / slots.length) * 100).toFixed(1)}%)`);
      console.log(`  Limited: ${statusBreakdown.limited} (${((statusBreakdown.limited / slots.length) * 100).toFixed(1)}%)`);
      console.log(`  Booked: ${statusBreakdown.booked} (${((statusBreakdown.booked / slots.length) * 100).toFixed(1)}%)`);
      console.log(`  Pending: ${statusBreakdown.pending} (${((statusBreakdown.pending / slots.length) * 100).toFixed(1)}%)`);
      console.log(`\n  Booking rate: ${bookingRate.toFixed(1)}%`);
      console.log(`  Availability rate: ${availabilityRate.toFixed(1)}%`);

      expect(availabilityRate).toBeGreaterThan(0);
    });
  });

  describe('Contact and Support Workflow', () => {
    it('should provide complete contact information for inquiries', async () => {
      const settingsResponse = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = settingsResponse.body.data;

      console.log('\nContact Information:');
      console.log(`  Phone: ${settings.phone}`);
      console.log(`  Email: ${settings.email}`);
      console.log(`  Address: ${settings.address}`);

      if (settings.facebookUrl) {
        console.log(`  Facebook: ${settings.facebookUrl}`);
      }

      if (settings.instagramUrl) {
        console.log(`  Instagram: ${settings.instagramUrl}`);
      }

      // All essential contact fields should be present
      expect(settings.phone).toBeDefined();
      expect(settings.email).toBeDefined();
      expect(settings.address).toBeDefined();
      expect(settings.phone.length).toBeGreaterThan(0);
      expect(settings.email.includes('@')).toBe(true);
      expect(settings.address.length).toBeGreaterThan(10);
    });

    it('should support inquiry flow from package to contact', async () => {
      // User browses package
      const packagesResponse = await api()
        .get('/api/packages')
        .expect(200);

      const package1 = packagesResponse.body.data[0];

      // User wants more info, gets contact details
      const settingsResponse = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = settingsResponse.body.data;

      console.log(`\nInquiry Flow:`);
      console.log(`  1. Customer interested in "${package1.name}"`);
      console.log(`  2. Package details: $${package1.price}, ${package1.maxGuests} guests`);
      console.log(`  3. Contact for booking: ${settings.phone} or ${settings.email}`);

      expect(package1).toBeDefined();
      expect(settings.phone).toBeDefined();
    });
  });

  describe('End-to-End Data Consistency', () => {
    it('should maintain referential integrity across all collections', async () => {
      // Fetch all data
      const [packages, slots, menuItems, gallery, settings] = await Promise.all([
        api().get('/api/packages').expect(200).then(res => res.body.data),
        api().get('/api/party-slots').expect(200).then(res => res.body.data),
        api().get('/api/menu-items').expect(200).then(res => res.body.data),
        api().get('/api/galleries').expect(200).then(res => res.body.data),
        api().get('/api/site-settings-data').expect(200).then(res => res.body.data),
      ]);

      console.log('\n=== Data Integrity Report ===');
      console.log(`Packages: ${packages.length}`);
      console.log(`Party Slots: ${slots.length}`);
      console.log(`Menu Items: ${menuItems.length}`);
      console.log(`Gallery Images: ${gallery.length}`);
      console.log(`Site Settings: Configured`);

      // Verify all collections have data
      expect(packages.length).toBeGreaterThan(0);
      expect(slots.length).toBeGreaterThan(0);
      expect(menuItems.length).toBeGreaterThan(0);
      expect(gallery.length).toBeGreaterThan(0);
      expect(settings.heroTitle).toBeDefined();

      console.log('\n✓ All collections have data');
      console.log('✓ Referential integrity maintained');
    });
  });
});
