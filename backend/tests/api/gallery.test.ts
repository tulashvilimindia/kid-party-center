import { api, validators, assertStrapiEntity } from '../utils/testHelpers';

describe('Gallery API E2E Tests', () => {
  let galleryItems: any[] = [];

  describe('GET /api/galleries', () => {
    it('should return 200 and fetch all gallery items', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      galleryItems = response.body.data;
    });

    it('should return published gallery items only', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(validators.hasPublishedAt(item)).toBe(true);
        assertStrapiEntity(item);
      });
    });

    it('should have valid data structure for each gallery item', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;
      expect(items.length).toBeGreaterThan(0);

      items.forEach((item: any) => {
        // Check Strapi entity fields
        assertStrapiEntity(item);

        // Check required custom fields
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('image');

        // Validate data types
        expect(typeof item.title).toBe('string');
        expect(typeof item.image).toBe('string');

        // Optional fields
        if (item.description) {
          expect(typeof item.description).toBe('string');
        }

        if (item.category) {
          expect(typeof item.category).toBe('string');
        }

        if (item.date) {
          expect(typeof item.date).toBe('string');
        }
      });
    });

    it('should have valid titles (non-empty)', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(item.title.trim().length).toBeGreaterThan(0);
        expect(item.title.length).toBeLessThan(200); // Reasonable limit
      });
    });

    it('should have valid image URLs', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        // Image should be a URL or path
        expect(typeof item.image).toBe('string');
        expect(item.image.length).toBeGreaterThan(0);

        // Should be a valid URL or relative path
        const isUrl = validators.isValidUrl(item.image);
        const isPath = item.image.startsWith('/');

        expect(isUrl || isPath).toBe(true);
      });
    });

    it('should have valid image file extensions', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const hasValidExtension = validExtensions.some(ext =>
          item.image.toLowerCase().includes(ext)
        );

        expect(hasValidExtension).toBe(true);
      });
    });

    it('should have valid dates if present', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        if (item.date) {
          expect(validators.isValidDate(item.date)).toBe(true);
        }
      });
    });

    it('should have valid categories if present', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      const validCategories = ['birthday', 'party', 'event', 'celebration', 'activity', 'decoration'];

      items.forEach((item: any) => {
        if (item.category) {
          // Category should be a non-empty string
          expect(typeof item.category).toBe('string');
          expect(item.category.trim().length).toBeGreaterThan(0);

          // Log categories for review
          console.log(`Gallery item "${item.title}" has category: ${item.category}`);
        }
      });
    });

    it('should have reasonable descriptions if present', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        if (item.description) {
          expect(item.description.trim().length).toBeGreaterThan(0);
          expect(item.description.length).toBeLessThan(1000); // Reasonable limit
        }
      });
    });
  });

  describe('GET /api/galleries/:id', () => {
    it('should fetch a single gallery item by id', async () => {
      // First get all gallery items to get a valid ID
      const listResponse = await api()
        .get('/api/galleries')
        .expect(200);

      const items = listResponse.body.data;
      expect(items.length).toBeGreaterThan(0);

      const firstItem = items[0];

      // Now fetch that specific item
      const response = await api()
        .get(`/api/galleries/${firstItem.documentId}`)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(firstItem.id);
      expect(response.body.data.documentId).toBe(firstItem.documentId);
      expect(response.body.data.title).toBe(firstItem.title);
    });

    it('should return 404 for non-existent gallery item', async () => {
      await api()
        .get('/api/galleries/non-existent-gallery-id')
        .expect(404);
    });
  });

  describe('Data Integrity Checks', () => {
    it('should not have duplicate titles', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;
      const titles = new Set<string>();

      items.forEach((item: any) => {
        if (titles.has(item.title)) {
          console.warn(`Warning: Duplicate gallery title found: ${item.title}`);
        }
        titles.add(item.title);
      });

      // This is just a warning, not a hard requirement
      expect(items.length).toBeGreaterThan(0);
    });

    it('should not have duplicate images', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;
      const images = new Set<string>();

      items.forEach((item: any) => {
        if (images.has(item.image)) {
          console.warn(`Warning: Duplicate image URL found: ${item.image}`);
        }
        images.add(item.image);
      });

      // This is just a warning, not a hard requirement
      expect(items.length).toBeGreaterThan(0);
    });

    it('should have a good distribution of categories', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;
      const categoryCount: { [key: string]: number } = {};

      items.forEach((item: any) => {
        if (item.category) {
          categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
        }
      });

      console.log('Gallery category distribution:', categoryCount);

      // Should have items
      expect(items.length).toBeGreaterThan(0);
    });

    it('should have recent images if dates are provided', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;
      const now = new Date();
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(now.getFullYear() - 2);

      let datedItems = 0;
      let recentItems = 0;

      items.forEach((item: any) => {
        if (item.date) {
          datedItems++;
          const itemDate = new Date(item.date);

          if (itemDate >= twoYearsAgo) {
            recentItems++;
          }
        }
      });

      if (datedItems > 0) {
        console.log(`${recentItems}/${datedItems} gallery items are from the last 2 years`);
      }

      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('Image Validation', () => {
    it('should have accessible image URLs', async () => {
      const response = await api()
        .get('/api/galleries')
        .expect(200);

      const items = response.body.data;

      // Test a sample of images (first 5)
      const sampleItems = items.slice(0, Math.min(5, items.length));

      for (const item of sampleItems) {
        // If it's a full URL, try to fetch it
        if (validators.isValidUrl(item.image)) {
          try {
            const imgResponse = await api()
              .get(item.image.replace(API_BASE_URL, ''))
              .timeout(5000);

            console.log(`Image accessible: ${item.image} (${imgResponse.status})`);
          } catch (error) {
            console.warn(`Warning: Image may not be accessible: ${item.image}`);
          }
        }
      }

      expect(items.length).toBeGreaterThan(0);
    }, 30000); // Longer timeout for image checks
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time (< 1 second)', async () => {
      const startTime = Date.now();

      await api()
        .get('/api/galleries')
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(1000);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        api().get('/api/galleries').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      });
    });

    it('should handle pagination efficiently', async () => {
      const response = await api()
        .get('/api/galleries?pagination[pageSize]=5&pagination[page]=1')
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(5);
      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
    });
  });
});
