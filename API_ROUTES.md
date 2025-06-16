# API Routes Documentation

## Base URL
```
/api/v1
```

## Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Controller#Action | Description |
|--------|----------|-------------------|-------------|
| POST | `/sign_up` | `registrations#create` | Register new user |
| POST | `/sign_in` | `sessions#create` | Authenticate user |
| DELETE | `/sign_out` | `sessions#destroy` | Sign out user |
| GET | `/me` | `sessions#me` | Get current user |
| POST | `/password` | `passwords#create` | Forgot password |
| PUT | `/password` | `passwords#update` | Reset password |
| GET | `/confirmation` | `confirmations#show` | Confirm email |
| POST | `/confirmation` | `confirmations#create` | Resend confirmation |
| PUT | `/update` | `registrations#update` | Update profile |
| DELETE | `/cancel` | `registrations#destroy` | Cancel account |

## Full URLs

### Authentication
- `POST /api/v1/auth/sign_up`
- `POST /api/v1/auth/sign_in`
- `DELETE /api/v1/auth/sign_out`
- `GET /api/v1/auth/me`

### Password Management
- `POST /api/v1/auth/password` (forgot password)
- `PUT /api/v1/auth/password` (reset password)

### Email Confirmation
- `GET /api/v1/auth/confirmation` (confirm email)
- `POST /api/v1/auth/confirmation` (resend confirmation)

### Profile Management
- `PUT /api/v1/auth/update` (update profile)
- `DELETE /api/v1/auth/cancel` (cancel account)

## Route Helpers

### Authentication
```ruby
api_v1_auth_sign_up_path     # => "/api/v1/auth/sign_up"
api_v1_auth_sign_in_path     # => "/api/v1/auth/sign_in"
api_v1_auth_sign_out_path    # => "/api/v1/auth/sign_out"
api_v1_auth_me_path          # => "/api/v1/auth/me"
```

### Password
```ruby
api_v1_auth_password_path    # => "/api/v1/auth/password"
```

### Confirmation
```ruby
api_v1_auth_confirmation_path # => "/api/v1/auth/confirmation"
```

### Profile
```ruby
api_v1_auth_update_path      # => "/api/v1/auth/update"
api_v1_auth_cancel_path      # => "/api/v1/auth/cancel"
```

## Testing Routes

You can test the routes are working by running:

```bash
# Check all API routes
rails routes | grep api

# Test a specific route
curl -X GET http://localhost:3000/api/v1/auth/me
```

## Notes

- All routes are namespaced under `/api/v1/`
- Authentication routes are under `/api/v1/auth/`
- Protected routes require JWT token in Authorization header
- Routes are separate from web routes (no conflicts) 