import request from 'supertest';

/**
 * Base URL for API tests
 * Adjust this based on your environment
 */
export const API_BASE_URL = process.env.API_URL || 'http://localhost:1337';

/**
 * Create a test request instance
 */
export const api = () => request(API_BASE_URL);

/**
 * Validation helpers
 */
export const validators = {
  /**
   * Validate ISO date format (YYYY-MM-DD)
   */
  isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString + 'T00:00:00');
    return !isNaN(date.getTime());
  },

  /**
   * Validate time format (HH:MM:SS.mmm or HH:MM:SS)
   */
  isValidTime(timeString: string): boolean {
    const regex = /^\d{2}:\d{2}:\d{2}(\.\d{3})?$/;
    return regex.test(timeString);
  },

  /**
   * Validate URL format
   */
  isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate image URL (basic check)
   */
  isValidImageUrl(urlString: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => urlString.toLowerCase().includes(ext));
  },

  /**
   * Validate status enum
   */
  isValidStatus(status: string): boolean {
    const validStatuses = ['available', 'limited', 'booked', 'pending'];
    return validStatuses.includes(status);
  },

  /**
   * Validate Strapi response structure
   */
  isValidStrapiResponse(response: any): boolean {
    return (
      response &&
      typeof response === 'object' &&
      Array.isArray(response.data)
    );
  },

  /**
   * Validate published entity
   */
  hasPublishedAt(entity: any): boolean {
    return entity && entity.publishedAt !== null && entity.publishedAt !== undefined;
  }
};

/**
 * Common assertions for Strapi entities
 */
export const assertStrapiEntity = (entity: any) => {
  expect(entity).toHaveProperty('id');
  expect(entity).toHaveProperty('documentId');
  expect(entity).toHaveProperty('createdAt');
  expect(entity).toHaveProperty('updatedAt');
  expect(entity).toHaveProperty('publishedAt');
};

/**
 * Wait helper for async operations
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry helper for flaky tests
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await wait(delayMs);
      }
    }
  }

  throw lastError!;
};
