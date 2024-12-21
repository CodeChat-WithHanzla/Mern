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

## Profile API

### GET users/profile

### Request Format:

- **Headers:**
  - `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not stored in cookies)
- **Cookies:**
  - `token`: `<JWT_TOKEN>` (optional, if token is not passed in headers)

### Response Format:

- **Missing Token:**

  ```json
  {
    "msg": "Unauthorized"
  }
  ```

- **Invalid Token:**
  ```json
  {
    "msg": "Unauthorized"
  }
  ```

---

### Response Format:

- **Successful Response:**
  ```json
  {
    "_id": "<user-id>",
    "name": "string",
    "email": "string",
    ...other user fields
  }
  ```

---

## Logout API

### GET users/logout

This endpoint allows users to logout by invalidating their current session token.

### Request Format:

- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Cookie:**
  - `token`: `<token>`

### Response (200 - OK)

```json
{
  "msg": "Logged out"
}
```

### Response (401 - Unauthorized)

````json
{
  "msg": "Unauthorized"
}
````
## Captain Registration API

### POST captains/register

This endpoint allows captains to register by providing their email, first name, last name, password, and vehicle details. Upon successful registration, a JWT token is generated and returned along with the captain's data.

### Request Conditions

- The firstName and email must be unique.
- The firstName must be at least 3 characters long.
- The password must be at least 6 characters long.
- The vehicle's plate must be unique.

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
````

### Response (201 - Created)

```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "__v": 0
  }
}
```

### Response (400 - Bad Request)

```json
{
  "error": [
    {
      "msg": "Error message"
    }
  ]
}
```
## Captain Profile API

### GET captains/profile

### Request Format:

- **Headers:**
  - `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not stored in cookies)
- **Cookies:**
  - `token`: `<JWT_TOKEN>` (optional, if token is not passed in headers)

### Response Format:

- **Missing Token:**

  ```json
  {
    "msg": "Unauthorized"
  }
  ```

- **Invalid Token:**
  ```json
  {
    "msg": "Unauthorized"
  }
  ```

- **Successful Response:**
  ```json
  {
    "_id": "<captain-id>",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    ...other captain fields
  }
  ```

## Captain Logout API

### GET captains/logout

This endpoint allows captains to logout by invalidating their current session token.

### Request Format:

- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Cookie:**
  - `token`: `<token>`

### Response (200 - OK)

```json
{
  "msg": "Logged out"
}
```

### Response (401 - Unauthorized)

```json
{
  "msg": "Unauthorized"
}
```