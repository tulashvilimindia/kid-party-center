# KidParty Backend Testing Guide

## Overview

This document describes the comprehensive test suite for the KidParty backend API built with Strapi.

## Test Structure

```
tests/
├── api/                          # API endpoint tests
│   ├── packages.test.ts         # Packages API E2E tests
│   ├── party-slots.test.ts      # Party Slots API E2E tests
│   ├── gallery.test.ts          # Gallery API E2E tests
│   ├── menu-items.test.ts       # Menu Items API E2E tests
│   └── site-settings.test.ts    # Site Settings API E2E tests
├── integration/                  # Integration tests
│   ├── data-validation.test.ts  # Cross-collection validation
│   └── booking-workflow.test.ts # Complete booking workflows
└── utils/
    └── testHelpers.ts           # Shared test utilities
```

## Test Coverage

### API Tests

#### 1. Packages API (`tests/api/packages.test.ts`)
Tests for `/api/packages` endpoint:
- ✓ Fetching all packages
- ✓ Published packages only
- ✓ Valid data structure
- ✓ Field validation (name, description, price, duration, maxGuests)
- ✓ Price validation
- ✓ Duration and capacity validation
- ✓ Image URL validation
- ✓ Features array validation
- ✓ Unique package names
- ✓ Featured/popular packages
- ✓ Single package retrieval by ID
- ✓ 404 for non-existent packages
- ✓ Price tier logic
- ✓ Price per guest ratios
- ✓ Performance tests (< 1 second response)
- ✓ Concurrent request handling

#### 2. Party Slots API (`tests/api/party-slots.test.ts`)
Tests for `/api/party-slots` endpoint:
- ✓ Fetching all party slots
- ✓ Published slots only
- ✓ Valid data structure
- ✓ Date format validation (YYYY-MM-DD)
- ✓ Time format validation (HH:MM:SS)
- ✓ Status validation (available, limited, booked, pending)
- ✓ EndTime after startTime logic
- ✓ Future dates only
- ✓ Status distribution
- ✓ Single slot retrieval by ID
- ✓ 404 for non-existent slots
- ✓ No duplicate slots (same date/time)
- ✓ Date ordering
- ✓ Business hours validation
- ✓ Slot duration validation (1-5 hours)
- ✓ Performance tests

#### 3. Gallery API (`tests/api/gallery.test.ts`)
Tests for `/api/galleries` endpoint:
- ✓ Fetching all gallery items
- ✓ Published items only
- ✓ Valid data structure
- ✓ Title validation
- ✓ Image URL validation
- ✓ Valid image file extensions
- ✓ Date validation
- ✓ Category validation
- ✓ Description validation
- ✓ Single item retrieval by ID
- ✓ Duplicate detection (titles, images)
- ✓ Category distribution
- ✓ Recent images check
- ✓ Image accessibility tests
- ✓ Performance tests
- ✓ Pagination handling

#### 4. Menu Items API (`tests/api/menu-items.test.ts`)
Tests for `/api/menu-items` endpoint:
- ✓ Fetching all menu items
- ✓ Published items only
- ✓ Valid data structure
- ✓ Name validation
- ✓ Category validation (food, drinks, dessert, extras)
- ✓ Price validation
- ✓ Description validation
- ✓ Category grouping
- ✓ Unique names within categories
- ✓ Single item retrieval by ID
- ✓ Items in all categories
- ✓ Price ranges per category
- ✓ Logical pricing analysis
- ✓ Filtering by category
- ✓ Sorting by price
- ✓ Pagination
- ✓ Performance tests

#### 5. Site Settings API (`tests/api/site-settings.test.ts`)
Tests for `/api/site-settings-data` endpoint:
- ✓ Fetching site settings
- ✓ Valid data structure
- ✓ Hero title validation
- ✓ Hero subtitle validation
- ✓ Intro text validation
- ✓ Phone number format
- ✓ Email format
- ✓ Address validation
- ✓ Facebook URL validation
- ✓ Instagram URL validation
- ✓ Social media presence
- ✓ Data completeness
- ✓ Branding consistency
- ✓ Content quality checks
- ✓ Security checks (no sensitive data exposed)
- ✓ Performance tests (< 500ms)
- ✓ Cache headers validation

### Integration Tests

#### 1. Data Validation (`tests/integration/data-validation.test.ts`)
Cross-collection validation tests:
- ✓ Package and party slot integration
- ✓ Valid package names in slots
- ✓ Slot durations matching package durations
- ✓ All required API endpoints accessible
- ✓ Consistent data across collections
- ✓ Data completeness scores
- ✓ Anomaly detection
- ✓ No overlapping party slots
- ✓ Balanced availability across dates
- ✓ Appropriate status distribution

#### 2. Booking Workflow (`tests/integration/booking-workflow.test.ts`)
End-to-end booking scenarios:
- ✓ Complete booking journey (browse → select → menu)
- ✓ Cost calculation for bookings
- ✓ Package and slot compatibility
- ✓ Popular packages availability
- ✓ Menu planning for different party sizes
- ✓ Dietary variations support
- ✓ Gallery and package correlation
- ✓ Visual branding consistency
- ✓ Capacity and availability analysis
- ✓ Booking status tracking
- ✓ Contact and support workflow
- ✓ Inquiry flow from package to contact
- ✓ End-to-end data consistency
- ✓ Referential integrity

## Running Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Make sure your Strapi server is running:
```bash
npm run develop
```

3. Ensure the database is seeded with test data

### Test Commands

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run specific test file:
```bash
npm test -- tests/api/packages.test.ts
```

Run tests matching a pattern:
```bash
npm test -- --testNamePattern="Packages API"
```

## Test Configuration

Tests are configured in `jest.config.js`:
- Test environment: Node.js
- Test timeout: 30 seconds
- Test directory: `tests/`
- Coverage directory: `coverage/`

## Environment Variables

Configure the API URL in your environment:
```bash
API_URL=http://localhost:1337
```

Default: `http://localhost:1337`

## Test Helpers

### Available Helpers (`tests/utils/testHelpers.ts`)

#### `api()`
Creates a supertest request instance for API testing.

```typescript
const response = await api()
  .get('/api/packages')
  .expect(200);
```

#### Validators

- `validators.isValidDate(date)` - Validates YYYY-MM-DD format
- `validators.isValidTime(time)` - Validates HH:MM:SS format
- `validators.isValidUrl(url)` - Validates URL format
- `validators.isValidImageUrl(url)` - Validates image URL
- `validators.isValidStatus(status)` - Validates party slot status
- `validators.isValidStrapiResponse(response)` - Validates Strapi response structure
- `validators.hasPublishedAt(entity)` - Checks if entity is published

#### Assertions

- `assertStrapiEntity(entity)` - Asserts entity has required Strapi fields

#### Utilities

- `wait(ms)` - Async wait helper
- `retry(fn, maxAttempts, delayMs)` - Retry helper for flaky tests

## Best Practices

1. **Always check response structure**: Use `validators.isValidStrapiResponse()`
2. **Test both success and error cases**: Include 404 tests for invalid IDs
3. **Validate data types**: Check field types, not just presence
4. **Use meaningful assertions**: Test business logic, not just technical correctness
5. **Log useful information**: Use `console.log()` to track test execution
6. **Keep tests independent**: Each test should work in isolation
7. **Use descriptive test names**: Clearly describe what is being tested
8. **Group related tests**: Use `describe` blocks effectively

## Performance Benchmarks

All API endpoints should meet these performance criteria:
- Individual GET requests: < 1 second
- Site settings: < 500ms (should be cached)
- Concurrent requests (10x): All successful
- No memory leaks or connection issues

## Continuous Integration

To integrate with CI/CD:

1. Ensure Strapi is running in test mode
2. Seed the database before running tests
3. Run tests with: `npm test`
4. Generate coverage report: `npm run test:coverage`
5. Fail build if tests fail or coverage drops

## Troubleshooting

### Tests timing out
- Increase timeout in jest.config.js
- Check if Strapi server is running
- Verify network connectivity

### Tests failing randomly
- Use the `retry()` helper for flaky tests
- Check for race conditions
- Ensure proper test isolation

### Connection errors
- Verify API_URL environment variable
- Check Strapi server logs
- Ensure database is accessible

### Data validation failures
- Verify seed data is correct
- Check Strapi content types match test expectations
- Ensure permissions are set correctly

## Future Improvements

- [ ] Add authentication tests
- [ ] Add authorization/permission tests
- [ ] Add mutation tests (POST, PUT, DELETE)
- [ ] Add load testing
- [ ] Add error handling tests
- [ ] Add webhook tests
- [ ] Add email notification tests
- [ ] Add payment integration tests

## Contributing

When adding new tests:
1. Follow the existing file structure
2. Use the test helpers
3. Add appropriate logging
4. Update this documentation
5. Ensure all tests pass before committing
