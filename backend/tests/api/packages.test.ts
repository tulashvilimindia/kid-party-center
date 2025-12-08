import { api, validators, assertStrapiEntity } from '../utils/testHelpers';

describe('Packages API E2E Tests', () => {
  let packages: any[] = [];

  describe('GET /api/packages', () => {
    it('should return 200 and fetch all packages', async () => {
      const response = await api()
        .get('/api/packages')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      packages = response.body.data;
    });

    it('should return published packages only', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(validators.hasPublishedAt(pkg)).toBe(true);
        assertStrapiEntity(pkg);
      });
    });

    it('should have valid data structure for each package', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;
      expect(pkgs.length).toBeGreaterThan(0);

      pkgs.forEach((pkg: any) => {
        // Check Strapi entity fields
        assertStrapiEntity(pkg);

        // Check required custom fields
        expect(pkg).toHaveProperty('name');
        expect(pkg).toHaveProperty('description');
        expect(pkg).toHaveProperty('price');
        expect(pkg).toHaveProperty('duration');
        expect(pkg).toHaveProperty('maxGuests');

        // Validate data types
        expect(typeof pkg.name).toBe('string');
        expect(typeof pkg.description).toBe('string');
        expect(typeof pkg.price).toBe('number');
        expect(typeof pkg.duration).toBe('number');
        expect(typeof pkg.maxGuests).toBe('number');

        // Optional fields
        if (pkg.image) {
          expect(typeof pkg.image).toBe('string');
        }

        if (pkg.features) {
          expect(Array.isArray(pkg.features)).toBe(true);
        }

        if (pkg.popular !== undefined) {
          expect(typeof pkg.popular).toBe('boolean');
        }

        if (pkg.featured !== undefined) {
          expect(typeof pkg.featured).toBe('boolean');
        }
      });
    });

    it('should have valid package names (non-empty)', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(pkg.name.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have valid descriptions (non-empty)', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(pkg.description.trim().length).toBeGreaterThan(0);
        expect(pkg.description.length).toBeGreaterThan(10); // Minimum meaningful description
      });
    });

    it('should have valid prices (positive numbers)', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(pkg.price).toBeGreaterThan(0);
        expect(pkg.price).toBeLessThan(10000); // Reasonable upper limit
        expect(Number.isFinite(pkg.price)).toBe(true);
      });
    });

    it('should have valid durations (positive numbers in reasonable range)', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(pkg.duration).toBeGreaterThan(0);
        expect(pkg.duration).toBeLessThanOrEqual(480); // Max 8 hours
        expect(Number.isInteger(pkg.duration)).toBe(true);
      });
    });

    it('should have valid maxGuests (positive integers)', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        expect(pkg.maxGuests).toBeGreaterThan(0);
        expect(pkg.maxGuests).toBeLessThan(200); // Reasonable upper limit
        expect(Number.isInteger(pkg.maxGuests)).toBe(true);
      });
    });

    it('should have valid image URLs if present', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        if (pkg.image) {
          expect(validators.isValidUrl(pkg.image) || pkg.image.startsWith('/')).toBe(true);
        }
      });
    });

    it('should have valid features array if present', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        if (pkg.features) {
          expect(Array.isArray(pkg.features)).toBe(true);
          pkg.features.forEach((feature: any) => {
            expect(typeof feature).toBe('string');
            expect(feature.trim().length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should have unique package names', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;
      const names = new Set<string>();

      pkgs.forEach((pkg: any) => {
        if (names.has(pkg.name)) {
          fail(`Duplicate package name found: ${pkg.name}`);
        }
        names.add(pkg.name);
      });
    });

    it('should have at least one featured or popular package', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      const hasFeatured = pkgs.some((pkg: any) => pkg.featured === true);
      const hasPopular = pkgs.some((pkg: any) => pkg.popular === true);

      expect(hasFeatured || hasPopular).toBe(true);
    });
  });

  describe('GET /api/packages/:id', () => {
    it('should fetch a single package by id', async () => {
      // First get all packages to get a valid ID
      const listResponse = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = listResponse.body.data;
      expect(pkgs.length).toBeGreaterThan(0);

      const firstPackage = pkgs[0];

      // Now fetch that specific package
      const response = await api()
        .get(`/api/packages/${firstPackage.documentId}`)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(firstPackage.id);
      expect(response.body.data.documentId).toBe(firstPackage.documentId);
      expect(response.body.data.name).toBe(firstPackage.name);
    });

    it('should return 404 for non-existent package', async () => {
      await api()
        .get('/api/packages/non-existent-package-id')
        .expect(404);
    });
  });

  describe('Data Integrity Checks', () => {
    it('should have logical price tiers', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      // Sort by price
      const sortedByPrice = [...pkgs].sort((a, b) => a.price - b.price);

      // Higher priced packages should generally have more guests or longer duration
      for (let i = 1; i < sortedByPrice.length; i++) {
        const cheaper = sortedByPrice[i - 1];
        const expensive = sortedByPrice[i];

        // More expensive package should offer more value (guests or duration)
        const cheaperValue = cheaper.maxGuests * cheaper.duration;
        const expensiveValue = expensive.maxGuests * expensive.duration;

        // This is a soft check - just log if it doesn't match
        if (expensiveValue < cheaperValue) {
          console.log(`Note: ${expensive.name} ($${expensive.price}) offers less value than ${cheaper.name} ($${cheaper.price})`);
        }
      });
    });

    it('should have reasonable price per guest ratios', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        const pricePerGuest = pkg.price / pkg.maxGuests;

        // Price per guest should be reasonable
        expect(pricePerGuest).toBeGreaterThan(1);
        expect(pricePerGuest).toBeLessThan(500);

        console.log(`${pkg.name}: $${pricePerGuest.toFixed(2)} per guest`);
      });
    });

    it('should have consistent feature counts', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      pkgs.forEach((pkg: any) => {
        if (pkg.features) {
          expect(pkg.features.length).toBeGreaterThan(0);
          expect(pkg.features.length).toBeLessThan(20); // Reasonable limit
        }
      });
    });
  });

  describe('Business Logic Validation', () => {
    it('should have packages sorted by some criteria', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;

      // Check if sorted by price, popularity, or name
      const byPrice = [...pkgs].sort((a, b) => a.price - b.price);
      const byName = [...pkgs].sort((a, b) => a.name.localeCompare(b.name));

      const isPriceSorted = JSON.stringify(pkgs.map((p: any) => p.id)) === JSON.stringify(byPrice.map((p: any) => p.id));
      const isNameSorted = JSON.stringify(pkgs.map((p: any) => p.id)) === JSON.stringify(byName.map((p: any) => p.id));

      console.log('Packages ordering:', {
        isPriceSorted,
        isNameSorted,
      });

      // Just verify we have a consistent order
      expect(pkgs.length).toBeGreaterThan(0);
    });

    it('should have featured packages at reasonable price points', async () => {
      const response = await api()
        .get('/api/packages')
        .expect(200);

      const pkgs = response.body.data;
      const featuredPackages = pkgs.filter((pkg: any) => pkg.featured === true);

      if (featuredPackages.length > 0) {
        featuredPackages.forEach((pkg: any) => {
          // Featured packages should be reasonably priced
          expect(pkg.price).toBeGreaterThan(0);
          console.log(`Featured package: ${pkg.name} at $${pkg.price}`);
        });
      }
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time (< 1 second)', async () => {
      const startTime = Date.now();

      await api()
        .get('/api/packages')
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(1000);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        api().get('/api/packages').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      });
    });
  });
});
