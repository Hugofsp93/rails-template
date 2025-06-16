# 🧪 API Testing Guide

## 🚀 Quick Start with Insomnia

### 1. Install Insomnia
- Download from: https://insomnia.rest/
- Install and create account

### 2. Import Requests
1. Open Insomnia
2. Click "Import/Export" → "Import Data"
3. Select "From File" and choose `insomnia_requests.json`
4. All requests will be imported automatically

### 3. Start Rails Server
```bash
rails server
```

### 4. Test Flow

#### **Step 1: Test Root (Optional)**
- Send "Root" request to verify server is running
- Should return HTML page

#### **Step 2: Sign Up**
- Send "Sign Up" request
- **Expected**: 200 OK with user data
- **Note**: User will be created but not confirmed

#### **Step 3: Sign In (Should Fail)**
- Send "Sign In" request
- **Expected**: 422 Unprocessable Entity
- **Reason**: Email not confirmed yet

#### **Step 4: Confirm Email (Manual)**
- Check your email for confirmation link
- Or use Rails console to confirm manually:
```ruby
user = User.find_by(email: 'test@example.com')
user.confirm!
```

#### **Step 5: Sign In (Should Work)**
- Send "Sign In" request again
- **Expected**: 200 OK with token
- **Important**: Copy the token from response

#### **Step 6: Update Environment**
- In Insomnia, go to Environment settings
- Set `token` variable to the token you copied

#### **Step 7: Test Protected Endpoints**
- **Get Current User**: Should return user data
- **Update Profile**: Should update user
- **Sign Out**: Should return success

## 🔧 Alternative: Manual Testing with curl

### Sign Up
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign_up \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890",
      "password": "password123",
      "password_confirmation": "password123"
    }
  }'
```

### Sign In
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign_in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User (with token)
```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐛 Troubleshooting

### Common Issues:

1. **404 Not Found**
   - Check if Rails server is running
   - Verify URL is correct
   - Routes should now work (FASE 1.2 completed)

2. **401 Unauthorized**
   - Token is missing or invalid
   - Check Authorization header format

3. **422 Unprocessable Entity**
   - Validation errors
   - Check request body format
   - Email might not be confirmed

4. **500 Internal Server Error**
   - Check Rails logs
   - Might be JWT gem issue

### Debug Commands:

```bash
# Check Rails logs
tail -f log/development.log

# Check if JWT gem is loaded
rails console
> require 'jwt'
> JWT.encode({test: 'data'}, 'secret', 'HS256')

# Check API routes
rails routes | grep api
```

## 📝 Expected Responses

### Successful Sign Up
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "test@example.com",
      "name": "Test User",
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

### Successful Sign In
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "test@example.com",
      "name": "Test User",
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

## 🎯 Next Steps

After testing successfully:
1. ✅ **FASE 1.1** - Controllers API criados
2. ✅ **FASE 1.2** - Rotas API configuradas
3. 🔄 **FASE 1.3** - Implementar autenticação JWT (já implementada)
4. 🔄 **FASE 1.4** - Testar endpoints manualmente (você pode fazer agora!)

## 🎉 Ready to Test!

**Agora os endpoints devem funcionar!** As rotas estão configuradas e os controllers estão prontos. Você pode testar todos os endpoints da API de autenticação. 