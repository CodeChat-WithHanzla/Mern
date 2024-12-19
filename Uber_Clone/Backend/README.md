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
    "password": "string"
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
