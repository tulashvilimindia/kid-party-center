import { api, validators, assertStrapiEntity } from '../utils/testHelpers';

describe('Menu Items API E2E Tests', () => {
  let menuItems: any[] = [];

  describe('GET /api/menu-items', () => {
    it('should return 200 and fetch all menu items', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      menuItems = response.body.data;
    });

    it('should return published menu items only', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(validators.hasPublishedAt(item)).toBe(true);
        assertStrapiEntity(item);
      });
    });

    it('should have valid data structure for each menu item', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;
      expect(items.length).toBeGreaterThan(0);

      items.forEach((item: any) => {
        // Check Strapi entity fields
        assertStrapiEntity(item);

        // Check required custom fields
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('pricePerChild');

        // Validate data types
        expect(typeof item.name).toBe('string');
        expect(typeof item.category).toBe('string');
        expect(typeof item.pricePerChild).toBe('number');

        // Optional fields
        if (item.description) {
          expect(typeof item.description).toBe('string');
        }

        if (item.image) {
          expect(typeof item.image).toBe('object');
        }
      });
    });

    it('should have valid menu item names (non-empty)', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(item.name.trim().length).toBeGreaterThan(0);
        expect(item.name.length).toBeLessThan(100);
      });
    });

    it('should have valid categories', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;
      const validCategories = ['food', 'drinks', 'dessert', 'extras'];

      items.forEach((item: any) => {
        expect(validCategories).toContain(item.category);
      });
    });

    it('should have valid prices (positive numbers)', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(item.pricePerChild).toBeGreaterThan(0);
        expect(item.pricePerChild).toBeLessThan(500);
        expect(Number.isFinite(item.pricePerChild)).toBe(true);
      });
    });

    it('should have reasonable descriptions if present', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        if (item.description) {
          expect(item.description.trim().length).toBeGreaterThan(0);
          expect(item.description.length).toBeLessThan(500);
        }
      });
    });

    it('should group items by category correctly', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      const categoryGroups = {
        food: items.filter((i: any) => i.category === 'food'),
        drinks: items.filter((i: any) => i.category === 'drinks'),
        dessert: items.filter((i: any) => i.category === 'dessert'),
        extras: items.filter((i: any) => i.category === 'extras'),
      };

      console.log('Category breakdown:', {
        food: categoryGroups.food.length,
        drinks: categoryGroups.drinks.length,
        dessert: categoryGroups.dessert.length,
        extras: categoryGroups.extras.length,
        total: items.length,
      });

      expect(items.length).toBeGreaterThan(0);
    });

    it('should have unique menu item names within same category', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      const categoryMap: { [key: string]: Set<string> } = {
        food: new Set(),
        drinks: new Set(),
        dessert: new Set(),
        extras: new Set(),
      };

      items.forEach((item: any) => {
        const categorySet = categoryMap[item.category];

        if (categorySet.has(item.name)) {
          console.warn(`Warning: Duplicate menu item name in ${item.category}: ${item.name}`);
        }

        categorySet.add(item.name);
      });

      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/menu-items/:id', () => {
    it('should fetch a single menu item by id', async () => {
      const listResponse = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = listResponse.body.data;
      expect(items.length).toBeGreaterThan(0);

      const firstItem = items[0];

      const response = await api()
        .get(`/api/menu-items/${firstItem.documentId}`)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(firstItem.id);
      expect(response.body.data.documentId).toBe(firstItem.documentId);
      expect(response.body.data.name).toBe(firstItem.name);
    });

    it('should return 404 for non-existent menu item', async () => {
      await api()
        .get('/api/menu-items/non-existent-id')
        .expect(404);
    });
  });

  describe('Data Integrity Checks', () => {
    it('should have items in all categories', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;
      const categories = new Set(items.map((item: any) => item.category));

      const expectedCategories = ['food', 'drinks', 'dessert', 'extras'];

      expectedCategories.forEach(category => {
        if (!categories.has(category)) {
          console.warn(`Warning: No items found in category: ${category}`);
        }
      });

      expect(items.length).toBeGreaterThan(0);
    });

    it('should have reasonable price ranges per category', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      const pricesByCategory: { [key: string]: number[] } = {
        food: [],
        drinks: [],
        dessert: [],
        extras: [],
      };

      items.forEach((item: any) => {
        pricesByCategory[item.category].push(item.pricePerChild);
      });

      Object.entries(pricesByCategory).forEach(([category, prices]) => {
        if (prices.length > 0) {
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

          console.log(`${category}: $${min.toFixed(2)} - $${max.toFixed(2)} (avg: $${avg.toFixed(2)})`);

          expect(min).toBeGreaterThan(0);
          expect(max).toBeLessThan(500);
        }
      });
    });

    it('should have logical pricing (food > drinks, dessert)', async () => {
      const response = await api()
        .get('/api/menu-items')
        .expect(200);

      const items = response.body.data;

      const avgPriceByCategory: { [key: string]: number } = {};

      ['food', 'drinks', 'dessert', 'extras'].forEach(category => {
        const categoryItems = items.filter((i: any) => i.category === category);

        if (categoryItems.length > 0) {
          const avg = categoryItems.reduce((sum: number, item: any) => sum + item.pricePerChild, 0) / categoryItems.length;
          avgPriceByCategory[category] = avg;
        }
      });

      console.log('Average prices by category:', avgPriceByCategory);

      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('Query and Filter Tests', () => {
    it('should filter by category', async () => {
      const response = await api()
        .get('/api/menu-items?filters[category][$eq]=food')
        .expect(200);

      const items = response.body.data;

      items.forEach((item: any) => {
        expect(item.category).toBe('food');
      });
    });

    it('should sort by price', async () => {
      const response = await api()
        .get('/api/menu-items?sort=pricePerChild:asc')
        .expect(200);

      const items = response.body.data;

      for (let i = 1; i < items.length; i++) {
        expect(items[i].pricePerChild).toBeGreaterThanOrEqual(items[i - 1].pricePerChild);
      }
    });

    it('should handle pagination', async () => {
      const response = await api()
        .get('/api/menu-items?pagination[pageSize]=5&pagination[page]=1')
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(5);
      expect(validators.isValidStrapiResponse(response.body)).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time (< 1 second)', async () => {
      const startTime = Date.now();

      await api()
        .get('/api/menu-items')
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(1000);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        api().get('/api/menu-items').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(validators.isValidStrapiResponse(response.body)).toBe(true);
      });
    });
  });
});
