// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/sign_in')
  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password)
  cy.get('[data-testid="sign-in-btn"]').click()
  cy.url().should('not.include', '/sign_in')
})

// Custom command to create a user
Cypress.Commands.add('createUser', (attributes = {}) => {
  const defaultAttributes = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    phone: `+551199999${Date.now().toString().slice(-4)}`,
    password: 'password123',
    password_confirmation: 'password123',
    confirmed_at: new Date().toISOString()
  }
  
  return cy.request({
    method: 'POST',
    url: '/api/users',
    body: { ...defaultAttributes, ...attributes },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.body
  })
})

// Generic command to create any model
Cypress.Commands.add('createModel', (modelName, attributes = {}) => {
  return cy.request({
    method: 'POST',
    url: `/api/${modelName}`,
    body: attributes,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.body
  })
})

// Custom command to clear database
Cypress.Commands.add('clearDatabase', () => {
  cy.request('POST', '/api/test/clear_database')
})

// Custom command to seed test data
Cypress.Commands.add('seedTestData', () => {
  cy.request('POST', '/api/test/seed_data')
})

// Custom command to check for flash messages
Cypress.Commands.add('shouldShowFlash', (type, message) => {
  cy.get(`[data-testid="flash-${type}"]`).should('contain', message)
})

// Custom command to check for validation errors
Cypress.Commands.add('shouldShowValidationError', (field, message) => {
  cy.get(`[data-testid="${field}-error"]`).should('contain', message)
})

// Custom command to fill form fields
Cypress.Commands.add('fillForm', (fields) => {
  Object.entries(fields).forEach(([field, value]) => {
    cy.get(`[data-testid="${field}-input"]`).clear().type(value)
  })
})

// Custom command to select from dropdown
Cypress.Commands.add('selectFromDropdown', (field, value) => {
  cy.get(`[data-testid="${field}-select"]`).select(value)
})

// Custom command to check checkbox
Cypress.Commands.add('checkCheckbox', (field) => {
  cy.get(`[data-testid="${field}-checkbox"]`).check()
})

// Custom command to uncheck checkbox
Cypress.Commands.add('uncheckCheckbox', (field) => {
  cy.get(`[data-testid="${field}-checkbox"]`).uncheck()
})

// Custom command to create a nade
Cypress.Commands.add('createNade', (attributes = {}) => {
  const defaultAttributes = {
    name: `Test Nade ${Date.now()}`,
    description: 'Test Description',
    age: 25,
    population: 1000000,
    price: 99.99,
    total: 150.50,
    is_active: true,
    published_at: '2024-01-01T10:00:00Z',
    birth_date: '1999-01-01',
    start_time: '10:00:00',
    binary_data: 'test binary data',
    user_id: 1
  }
  
  return cy.request({
    method: 'POST',
    url: '/api/nades',
    body: { ...defaultAttributes, ...attributes },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.body
  })
})

// Custom command to create a nade via UI (for integration tests)
Cypress.Commands.add('createNadeViaUI', (attributes = {}) => {
  const defaultAttributes = {
    name: `Test Nade ${Date.now()}`,
    description: 'Test Description',
    age: '25',
    population: '1000000',
    price: '99.99',
    total: '150.50',
    is_active: true,
    published_at: '2024-01-01T10:00',
    birth_date: '2024-01-01',
    start_time: '10:00',
    user_id: '1'
  }
  
  cy.visit('/nades/new')
  
  Object.entries({ ...defaultAttributes, ...attributes }).forEach(([field, value]) => {
    const selector = `[data-testid="${field}-input"]`
    if (field === 'is_active') {
      if (value) {
        cy.get(`[data-testid="${field}-checkbox"]`).check()
      } else {
        cy.get(`[data-testid="${field}-checkbox"]`).uncheck()
      }
    } else if (field === 'user_id') {
      cy.get(`[data-testid="user-select"]`).select(value)
    } else if (field === 'description') {
      cy.get(`[data-testid="${field}-textarea"]`).type(value)
    } else {
      cy.get(selector).type(value)
    }
  })
  
  cy.get('[data-testid="submit-btn"]').click()
  
  // Return the created nade ID from the URL
  return cy.url().then((url) => {
    const match = url.match(/\/nades\/(\d+)/)
    return match ? { id: parseInt(match[1]) } : null
  })
})

// Custom command to fill nade form
Cypress.Commands.add('fillNadeForm', (fields) => {
  Object.entries(fields).forEach(([field, value]) => {
    const selector = `[data-testid="${field}-input"]`
    if (field === 'is_active') {
      if (value) {
        cy.get(`[data-testid="${field}-checkbox"]`).check()
      } else {
        cy.get(`[data-testid="${field}-checkbox"]`).uncheck()
      }
    } else if (field === 'user_id') {
      cy.get(`[data-testid="user-select"]`).select(value)
    } else if (field === 'description') {
      cy.get(`[data-testid="${field}-textarea"]`).clear().type(value)
    } else {
      cy.get(selector).clear().type(value)
    }
  })
})

// Custom command to verify nade data
Cypress.Commands.add('verifyNadeData', (expectedData) => {
  Object.entries(expectedData).forEach(([field, value]) => {
    if (field === 'is_active') {
      const selector = `[data-testid="${field}-field"]`
      cy.get(selector).should('contain', value ? 'Active' : 'Inactive')
    } else if (field === 'user_id') {
      cy.get('[data-testid="user-field"]').should('exist')
    } else {
      const selector = `[data-testid="${field}-field"]`
      cy.get(selector).should('contain', value)
    }
  })
})

// Custom command to test form validation
Cypress.Commands.add('testFormValidation', (invalidData, expectedErrors) => {
  Object.entries(invalidData).forEach(([field, value]) => {
    const selector = `[data-testid="${field}-input"]`
    if (field === 'description') {
      cy.get(`[data-testid="${field}-textarea"]`).clear().type(value)
    } else if (field === 'is_active') {
      // Skip checkbox for validation testing
    } else {
      cy.get(selector).clear().type(value)
    }
  })
  
  cy.get('[data-testid="submit-btn"]').click()
  
  // Verify error messages
  Object.entries(expectedErrors).forEach(([field, message]) => {
    cy.get(`[data-testid="${field}-error"]`).should('contain', message)
  })
}) 