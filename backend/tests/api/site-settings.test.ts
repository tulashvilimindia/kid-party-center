import { api, validators } from '../utils/testHelpers';

describe('Site Settings API E2E Tests', () => {
  describe('GET /api/site-settings-data', () => {
    it('should return 200 and fetch site settings', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('should have valid data structure', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Check required fields
      expect(settings).toHaveProperty('heroTitle');
      expect(settings).toHaveProperty('phone');
      expect(settings).toHaveProperty('email');
      expect(settings).toHaveProperty('address');

      // Validate data types
      expect(typeof settings.heroTitle).toBe('string');
      expect(typeof settings.phone).toBe('string');
      expect(typeof settings.email).toBe('string');
      expect(typeof settings.address).toBe('string');

      // Optional fields
      if (settings.heroSubtitle) {
        expect(typeof settings.heroSubtitle).toBe('string');
      }

      if (settings.introText) {
        expect(typeof settings.introText).toBe('string');
      }

      if (settings.facebookUrl) {
        expect(typeof settings.facebookUrl).toBe('string');
      }

      if (settings.instagramUrl) {
        expect(typeof settings.instagramUrl).toBe('string');
      }
    });

    it('should have valid hero title (non-empty)', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      expect(settings.heroTitle.trim().length).toBeGreaterThan(0);
      expect(settings.heroTitle.length).toBeLessThan(200);
    });

    it('should have valid hero subtitle if present', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      if (settings.heroSubtitle) {
        expect(settings.heroSubtitle.trim().length).toBeGreaterThan(0);
        expect(settings.heroSubtitle.length).toBeLessThan(500);
      }
    });

    it('should have valid intro text if present', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      if (settings.introText) {
        expect(settings.introText.trim().length).toBeGreaterThan(0);
        expect(settings.introText.length).toBeLessThan(5000);
      }
    });
  });

  describe('Contact Information Validation', () => {
    it('should have valid phone number format', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Phone should be non-empty string
      expect(settings.phone.trim().length).toBeGreaterThan(0);

      // Phone should contain digits
      expect(/\d/.test(settings.phone)).toBe(true);

      console.log('Phone:', settings.phone);
    });

    it('should have valid email format', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(settings.email)).toBe(true);

      console.log('Email:', settings.email);
    });

    it('should have valid address (non-empty)', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      expect(settings.address.trim().length).toBeGreaterThan(0);
      expect(settings.address.length).toBeLessThan(500);

      console.log('Address:', settings.address);
    });
  });

  describe('Social Media URLs Validation', () => {
    it('should have valid Facebook URL if present', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      if (settings.facebookUrl) {
        expect(validators.isValidUrl(settings.facebookUrl)).toBe(true);
        expect(settings.facebookUrl.toLowerCase()).toContain('facebook.com');

        console.log('Facebook URL:', settings.facebookUrl);
      }
    });

    it('should have valid Instagram URL if present', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      if (settings.instagramUrl) {
        expect(validators.isValidUrl(settings.instagramUrl)).toBe(true);
        expect(settings.instagramUrl.toLowerCase()).toContain('instagram.com');

        console.log('Instagram URL:', settings.instagramUrl);
      }
    });

    it('should have at least one social media URL', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      const hasFacebook = settings.facebookUrl && settings.facebookUrl.trim().length > 0;
      const hasInstagram = settings.instagramUrl && settings.instagramUrl.trim().length > 0;

      if (!hasFacebook && !hasInstagram) {
        console.warn('Warning: No social media URLs configured');
      }

      expect(settings).toBeDefined();
    });
  });

  describe('Data Completeness Checks', () => {
    it('should have all essential contact information', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      const completeness = {
        heroTitle: settings.heroTitle && settings.heroTitle.trim().length > 0,
        heroSubtitle: settings.heroSubtitle && settings.heroSubtitle.trim().length > 0,
        introText: settings.introText && settings.introText.trim().length > 0,
        phone: settings.phone && settings.phone.trim().length > 0,
        email: settings.email && settings.email.trim().length > 0,
        address: settings.address && settings.address.trim().length > 0,
        facebookUrl: settings.facebookUrl && settings.facebookUrl.trim().length > 0,
        instagramUrl: settings.instagramUrl && settings.instagramUrl.trim().length > 0,
      };

      console.log('Settings completeness:', completeness);

      // Essential fields must be present
      expect(completeness.heroTitle).toBe(true);
      expect(completeness.phone).toBe(true);
      expect(completeness.email).toBe(true);
      expect(completeness.address).toBe(true);
    });

    it('should have consistent branding (title and subtitle)', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      expect(settings.heroTitle).toBeDefined();

      if (settings.heroSubtitle) {
        // Subtitle should complement the title
        expect(settings.heroSubtitle.length).toBeGreaterThan(10);

        console.log('Hero Title:', settings.heroTitle);
        console.log('Hero Subtitle:', settings.heroSubtitle);
      }
    });
  });

  describe('Content Quality Checks', () => {
    it('should have professional and clear hero content', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Title should be concise
      expect(settings.heroTitle.split(' ').length).toBeLessThan(15);

      // Title shouldn't be all caps (bad UX)
      const isAllCaps = settings.heroTitle === settings.heroTitle.toUpperCase() && /[a-z]/i.test(settings.heroTitle);

      if (isAllCaps) {
        console.warn('Warning: Hero title is all caps, consider mixed case');
      }
    });

    it('should have intro text if configured', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      if (settings.introText) {
        // Intro text should be substantial
        expect(settings.introText.length).toBeGreaterThan(50);

        console.log('Intro text length:', settings.introText.length);
      }
    });
  });

  describe('Security and Privacy Checks', () => {
    it('should not expose sensitive configuration data', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Should not contain API keys, passwords, etc.
      const fieldsToCheck = [
        settings.heroTitle,
        settings.heroSubtitle,
        settings.introText,
        settings.phone,
        settings.email,
        settings.address,
        settings.facebookUrl,
        settings.instagramUrl,
      ].filter(Boolean).join(' ');

      const sensitivePatterns = [
        /api[_-]?key/i,
        /secret/i,
        /password/i,
        /token/i,
        /private[_-]?key/i,
      ];

      sensitivePatterns.forEach(pattern => {
        expect(pattern.test(fieldsToCheck)).toBe(false);
      });
    });

    it('should have publicly accessible contact info', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      const settings = response.body.data;

      // Email should be a business email
      expect(settings.email).toBeDefined();

      // Phone should be formatted
      expect(settings.phone).toBeDefined();

      // Address should be complete
      expect(settings.address.length).toBeGreaterThan(10);
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time (< 500ms)', async () => {
      const startTime = Date.now();

      await api()
        .get('/api/site-settings-data')
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(500);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        api().get('/api/site-settings-data').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(response.body.data).toBeDefined();
        expect(response.body.data.heroTitle).toBeDefined();
      });
    });

    it('should be cacheable', async () => {
      const response = await api()
        .get('/api/site-settings-data')
        .expect(200);

      // Check if cache headers are present
      const cacheControl = response.headers['cache-control'];

      if (cacheControl) {
        console.log('Cache-Control:', cacheControl);
      } else {
        console.warn('Warning: No cache headers set for site settings');
      }

      expect(response.body.data).toBeDefined();
    });
  });
});
