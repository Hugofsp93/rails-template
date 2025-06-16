# API Authentication Endpoints

## Base URL
```
/api/v1/auth
```

## Authentication
All endpoints except authentication endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Sign In
**POST** `/api/v1/auth/sign_in`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiJ9..."
  },
  "message": "Successfully signed in"
}
```

**Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

### 2. Sign Up
**POST** `/api/v1/auth/sign_up`

**Request Body:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "password_confirmation": "password123"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": null,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Successfully signed up. Please check your email to confirm your account."
}
```

### 3. Get Current User
**GET** `/api/v1/auth/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 4. Sign Out
**DELETE** `/api/v1/auth/sign_out`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully signed out"
}
```

### 5. Forgot Password
**POST** `/api/v1/auth/password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reset password instructions have been sent to your email"
}
```

### 6. Reset Password
**PUT** `/api/v1/auth/password`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "user": {
    "reset_password_token": "TOKEN_FROM_EMAIL",
    "email": "user@example.com",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Password has been changed successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "status": "error",
  "message": "Invalid or expired reset password token"
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "message": "User not found"
}
```

### 7. Confirm Email
**GET** `/api/v1/auth/confirmation?confirmation_token=token_from_email`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Your email address has been successfully confirmed"
}
```

### 8. Resend Confirmation
**POST** `/api/v1/auth/confirmation`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Confirmation instructions have been sent to your email"
}
```

### 9. Update Profile
**PUT** `/api/v1/auth/update`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "user": {
    "name": "John Updated",
    "email": "updated@example.com",
    "phone": "+0987654321"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "updated@example.com",
      "name": "John Updated",
      "phone": "+0987654321",
      "roles": ["operator"],
      "role_name": "operator",
      "confirmed_at": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Successfully updated"
}
```

## Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "Validation error message"
}
```

## JWT Token

JWT tokens are valid for 24 hours and contain:
- `user_id`: The user's ID
- `email`: The user's email
- `exp`: Expiration timestamp

## Testing

You can test these endpoints using curl, Postman, or any HTTP client. Remember to:
1. Use the correct Content-Type header: `Content-Type: application/json`
2. Include the Authorization header for protected endpoints
3. Send data as JSON in the request body 