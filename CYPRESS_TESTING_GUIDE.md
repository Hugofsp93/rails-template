# Cypress Testing Guide for Inertia Scaffold

## Overview

This guide explains how to test your Inertia scaffold using Cypress. The tests cover all CRUD operations, authorization, validation, and edge cases.

## Test Structure

### 1. **Index Page Tests**
- ✅ Display nades list
- ✅ Show/hide create button based on authorization
- ✅ Search functionality
- ✅ Status filtering
- ✅ Pagination
- ✅ Navigation to show/edit pages

### 2. **Show Page Tests**
- ✅ Display nade details
- ✅ Show/hide edit button based on authorization
- ✅ Navigation to edit page
- ✅ Back to index navigation

### 3. **Create Page Tests**
- ✅ Create nade with all fields
- ✅ Create nade with minimal required fields
- ✅ Validation errors for missing required fields
- ✅ Validation errors for invalid data types
- ✅ Validation errors for invalid date ranges
- ✅ Back to index navigation

### 4. **Edit Page Tests**
- ✅ Update existing nade
- ✅ Pre-populate form with existing data
- ✅ Validation errors for invalid updates
- ✅ Back to show page navigation

### 5. **Delete Functionality Tests**
- ✅ Delete from index page
- ✅ Delete from show page
- ✅ Cancel deletion

### 6. **Authorization Tests**
- ✅ Deny access to unauthorized users
- ✅ Allow access to authorized users
- ✅ Hide buttons for unauthorized users

### 7. **Edge Cases and Error Handling**
- ✅ Handle non-existent records
- ✅ Handle malformed URLs
- ✅ Handle large text inputs
- ✅ Handle special characters

### 8. **Performance and UX Tests**
- ✅ Page load performance
- ✅ Loading states during form submission
- ✅ Form state preservation on validation errors

## Custom Commands

### `cy.createNade(attributes)`
Creates a nade via API for testing purposes.

```javascript
cy.createNade({
  name: 'Test Nade',
  description: 'Test Description',
  age: 25,
  is_active: true
}).then((nade) => {
  // Use the created nade
})
```

### `cy.createNadeViaUI(attributes)`
Creates a nade through the UI (integration test).

```javascript
cy.createNadeViaUI({
  name: 'UI Test Nade',
  description: 'UI Test Description',
  user_id: '1'
})
```

### `cy.fillNadeForm(fields)`
Fills the nade form with provided data.

```javascript
cy.fillNadeForm({
  name: 'Form Test',
  description: 'Form Description',
  age: '30',
  is_active: true,
  user_id: '1'
})
```

### `cy.verifyNadeData(expectedData)`
Verifies that nade data is displayed correctly.

```javascript
cy.verifyNadeData({
  name: 'Expected Name',
  age: 25,
  is_active: true
})
```

### `cy.testFormValidation(invalidData, expectedErrors)`
Tests form validation with invalid data.

```javascript
cy.testFormValidation(
  { name: '', age: 'not a number' },
  { name: "can't be blank", age: 'is not a number' }
)
```

## Required Data Test IDs

Make sure your frontend components include these `data-testid` attributes:

### Index Page
- `nade-table` - Main table
- `create-nade-btn` - Create button
- `search-input` - Search input
- `search-button` - Search button
- `status-filter` - Status filter dropdown
- `pagination` - Pagination container
- `pagination-next` - Next page button
- `show-nade-{id}` - Show action button
- `edit-nade-{id}` - Edit action button
- `delete-nade-{id}` - Delete action button

### Show Page
- `edit-nade-btn` - Edit button
- `delete-nade-btn` - Delete button
- `back-to-index` - Back to index link
- `{field}-field` - Field display (e.g., `name-field`, `age-field`)

### Create/Edit Pages
- `{field}-input` - Input fields (e.g., `name-input`, `age-input`)
- `description-textarea` - Description textarea
- `is_active-checkbox` - Is active checkbox
- `user-select` - User dropdown
- `submit-btn` - Submit button
- `back-to-index` - Back to index link (create page)
- `back-to-show` - Back to show link (edit page)
- `{field}-error` - Error messages (e.g., `name-error`)

### Common
- `success-message` - Success flash message
- `error-message` - Error message
- `access-denied` - Access denied message
- `confirm-delete-btn` - Confirm deletion button
- `cancel-delete-btn` - Cancel deletion button

## Running Tests

### 1. **Setup Test Environment**
```bash
# Ensure you're in test environment
RAILS_ENV=test

# Run database migrations
rails db:migrate

# Seed test data
rails db:seed
```

### 2. **Start Rails Server for Testing**
```bash
# Start Rails server in test environment
RAILS_ENV=test rails server -p 3000
```

### 3. **Run Cypress Tests**
```bash
# Open Cypress UI
npx cypress open

# Run tests headlessly
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/nades.cy.js"
```

### 4. **Run Tests with Database Reset**
```bash
# Clear database before tests
curl -X POST http://localhost:3000/api/test/clear_database

# Seed test data
curl -X POST http://localhost:3000/api/test/seed_data

# Run tests
npx cypress run
```

## Test Data Management

### API Endpoints for Testing
- `POST /api/nades` - Create nade
- `GET /api/nades` - List nades
- `GET /api/nades/:id` - Get nade
- `PUT /api/nades/:id` - Update nade
- `DELETE /api/nades/:id` - Delete nade
- `POST /api/test/clear_database` - Clear test data
- `POST /api/test/seed_data` - Seed test data

### Test Users
- **Admin User**: `admin@example.com` / `password123`
- **Regular User**: `user@example.com` / `password123`

## Best Practices

### 1. **Test Isolation**
- Each test should be independent
- Use `beforeEach` to set up test state
- Clean up data after tests

### 2. **Data Test IDs**
- Use consistent naming convention
- Make selectors resilient to UI changes
- Avoid using text content for selectors

### 3. **Assertions**
- Test both positive and negative cases
- Verify UI state changes
- Check for proper error handling

### 4. **Performance**
- Keep tests fast and focused
- Use API calls for data setup when possible
- Avoid unnecessary UI interactions

### 5. **Maintenance**
- Update tests when UI changes
- Keep test data realistic
- Document complex test scenarios

## Troubleshooting

### Common Issues

1. **Tests failing due to missing data-testid**
   - Add missing data-testid attributes to components
   - Check component structure matches test expectations

2. **Authentication issues**
   - Ensure test users exist
   - Check login command works correctly
   - Verify user permissions

3. **API endpoint errors**
   - Check API routes are defined
   - Verify controllers handle requests properly
   - Ensure test environment is configured

4. **Timing issues**
   - Add appropriate waits for async operations
   - Use `cy.wait()` for network requests
   - Check for loading states

### Debugging Tips

1. **Use Cypress UI for debugging**
   ```bash
   npx cypress open
   ```

2. **Add console logs**
   ```javascript
   cy.log('Debug message')
   ```

3. **Take screenshots on failure**
   ```javascript
   cy.screenshot('test-failure')
   ```

4. **Check network requests**
   - Open browser dev tools
   - Monitor Network tab during test execution

## Continuous Integration

### GitHub Actions Example
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
      - name: Install dependencies
        run: |
          bundle install
          npm install
      - name: Setup database
        run: |
          RAILS_ENV=test rails db:create
          RAILS_ENV=test rails db:migrate
          RAILS_ENV=test rails db:seed
      - name: Start Rails server
        run: RAILS_ENV=test rails server -p 3000 &
      - name: Run Cypress tests
        run: npx cypress run
```

This comprehensive testing setup ensures your Inertia scaffold is thoroughly tested and maintains quality as you develop. 