# Backend API Documentation

## Overview

This documentation provides details on how to use the Backend API for user-related operations, such as registration, login, and more. As more routes are added, the documentation will continue to expand.

## Registration API

### POST users/register

This endpoint allows users to register by providing their email, first name, last name, and password. Upon successful registration, a JWT token is generated and returned along with the user's data.

### Request Conditions

- The firstName and email must be unique.
- The firstName must be at least 3 characters long.
- The password must be at least 6 characters long.

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Response (201 - Created)

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "password": "string",
    "__v": 0
  }
}
```

### Response (400 - Bad Request)

```json
{
  "error": [
    {
      "msg": "Error message",
      "param": "Field name",
      "location": "body"
    }
  ]
}
```

## Login API

### POST users/login

This endpoint allows users to login by providing their email and password. Upon successful login, a JWT token is generated and returned along with the user's data.

### Request Conditions

- The email address must be registered, and both the email and password are required. Additionally, the provided credentials must be accurate.

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Response (200 - Successful )

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "password": "string",
    "__v": 0
  }
}
```

### Response (404 - Not Found)

```json
{
  "msg": "The user associated with this email does not exist."
}
```

### Response (401 - Unauthorized)

```json
{
  "msg": "Incorrect password"
}
```
