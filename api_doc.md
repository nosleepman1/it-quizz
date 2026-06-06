## /api/v1/auth/login

### Request Body

```json
{
  "email": "[EMAIL_ADDRESS]",
  "password": "[PASSWORD]"
}
```

### Response Body

```json
{
  "message": "User logged in successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "[EMAIL_ADDRESS]",
    "phone": "1234567890",
    "address": "123 Main St",
    "created_at": "2022-01-01T00:00:00.000000Z",
    "updated_at": "2022-01-01T00:00:00.000000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
