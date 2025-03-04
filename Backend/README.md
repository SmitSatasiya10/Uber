# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: The user's first name (minimum 3 characters, required)
  - `lastname`: The user's last name (minimum 3 characters, optional)
- `email`: The user's email address (must be a valid email, required)
- `password`: The user's password (minimum 6 characters, required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

### Server Error
- **Status Code**: `500 Internal Server Error`
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint is used to log in a user. It requires the user's email and password.

## Request Body
The request body should be a JSON object with the following fields:
- `email`: The user's email address (must be a valid email, required)
- `password`: The user's password (minimum 6 characters, required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

### Invalid Credentials
- **Status Code**: `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Invalid Email or Password"
  }
  ```

### Server Error
- **Status Code**: `500 Internal Server Error`
- **Response Body**:
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```