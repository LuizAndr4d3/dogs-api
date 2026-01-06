# 🐕 Dogs API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A simple and elegant RESTful API for managing dogs built with <strong>NestJS</strong> and <strong>TypeScript</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node.js" />
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Authentication](#-authentication)
- [API Endpoints](#-api-endpoints)
- [Request/Response Examples](#-requestresponse-examples)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Data Storage](#-data-storage)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🐕 **CRUD Operations** - Create, Read, Update, and Delete dogs
- 🔐 **JWT Authentication** - Secure API endpoints with JSON Web Tokens
- 📝 **DTO Validation** - Type-safe data transfer objects
- 🎯 **TypeScript** - Full type safety and modern JavaScript features
- 🏗️ **NestJS Framework** - Scalable and maintainable architecture
- 🧪 **Testing Support** - Unit and E2E testing capabilities
- 📦 **JSON File Storage** - Simple and lightweight data persistence using JSON files

---

## 🛠️ Technologies

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Express](https://expressjs.com/)** - Web framework (via NestJS platform)
- **[JWT](https://jwt.io/)** - JSON Web Tokens for authentication
- **[Passport.js](http://www.passportjs.org/)** - Authentication middleware
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing
- **[UUID](https://www.npmjs.com/package/uuid)** - Unique identifier generation
- **[Jest](https://jestjs.io/)** - Testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git** (for cloning the repository)

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuizAndr4d3/dogs-api
   cd dogs-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

---

## ⚙️ Configuration

The application runs on port `3000` by default. You can customize this by setting the `PORT` environment variable:

```bash
# Windows (PowerShell)
$env:PORT=3001; npm run start:dev

# Linux/Mac
PORT=3001 npm run start:dev
```

Or create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET= secret-key-change-in-production
```

> **Note**: For production, always use a strong, randomly generated secret key for `JWT_SECRET`. Never commit this to version control.

---

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```
The application will start in watch mode, automatically reloading on file changes.

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The API will be available at `http://localhost:3000` (or your configured port).

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. Some endpoints require a valid JWT token to access.

### Test User

A test user is available for quick testing:

- **Username**: `testuser`
- **Password**: `securepassword123`

### How Authentication Works

1. **Register** a new user or **Login** with existing credentials
2. Receive a JWT `access_token` in the response
3. Include the token in the `Authorization` header for protected endpoints:
   ```
   Authorization: Bearer <your-token-here>
   ```

### Authentication Endpoints

#### Register a New User

**Request:**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "mypassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "newuser"
  }
}
```

#### Login

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "testuser"
  }
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

### Using the Token

Once you have the `access_token`, include it in the `Authorization` header for protected endpoints:

```http
POST /dogs/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Rex",
  "age": 5,
  "breed": "Labrador"
}
```

### Token Expiration

JWT tokens expire after **24 hours**. When a token expires, you'll receive a `401 Unauthorized` response. Simply login again to get a new token.

### User Storage

User data is stored in `users.json` in the root directory. This file is automatically created when the first user registers and is ignored by Git (`.gitignore`).

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and get JWT token | ❌ |

### Dogs Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/dogs/create` | Create a new dog | ✅ |
| `GET` | `/dogs/get/:id` | Get a dog by ID | ❌ |
| `GET` | `/dogs/getall` | Get all dogs | ❌ |
| `PUT` | `/dogs/edit/:id` | Update a dog by ID | ✅ |
| `DELETE` | `/dogs/delete/:id` | Delete a dog by ID | ✅ |

---

## 📝 Request/Response Examples

### Create a Dog

**Request:**
```http
POST /dogs/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Buddy",
  "age": 3,
  "breed": "Golden Retriever"
}
```

> **Note**: This endpoint requires authentication. Include the JWT token in the `Authorization` header.

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Buddy",
  "age": 3,
  "breed": "Golden Retriever"
}
```

### Get a Dog by ID

**Request:**
```http
GET /dogs/get/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Buddy",
  "age": 3,
  "breed": "Golden Retriever"
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "Dog not found"
}
```

### Get All Dogs

**Request:**
```http
GET /dogs/getall
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Buddy",
    "age": 3,
    "breed": "Golden Retriever"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Max",
    "age": 5,
    "breed": "German Shepherd"
  }
]
```

### Update a Dog

**Request:**
```http
PUT /dogs/edit/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Buddy Jr.",
  "age": 4
}
```

> **Note**: This endpoint requires authentication. Include the JWT token in the `Authorization` header.

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Buddy Jr.",
  "age": 4,
  "breed": "Golden Retriever"
}
```

### Delete a Dog

**Request:**
```http
DELETE /dogs/delete/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Note**: This endpoint requires authentication. Include the JWT token in the `Authorization` header.

**Response:**
```http
HTTP/1.1 200 OK
```

**Error Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 📁 Project Structure

```
dogs-api/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts    # Authentication endpoints
│   │   ├── auth.service.ts        # Authentication logic & user management
│   │   ├── auth.module.ts         # Auth module configuration
│   │   ├── auth.dtos.ts            # Auth DTOs (Register, Login)
│   │   ├── user.interface.ts      # User interface
│   │   ├── jwt.strategy.ts        # JWT Passport strategy
│   │   └── jwt-auth.guard.ts      # JWT authentication guard
│   ├── dogs/
│   │   ├── dogs.controller.ts    # Route handlers
│   │   ├── dogs.services.ts      # Business logic with JSON file operations
│   │   ├── dogs.dtos.ts          # Data Transfer Objects
│   │   └── dogs.interface.ts     # TypeScript interfaces
│   ├── app.controller.ts         # Root controller
│   ├── app.service.ts            # Root service
│   ├── app.module.ts             # Root module
│   └── main.ts                   # Application entry point
├── test/
│   ├── app.e2e-spec.ts          # E2E tests
│   └── jest-e2e.json            # E2E test configuration
├── dist/                         # Compiled JavaScript files
├── node_modules/                 # Dependencies
├── dogs.json                     # JSON database file (auto-created)
├── users.json                    # Users database file (auto-created, git-ignored)
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
└── README.md                     # This file
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run format` | Format code using Prettier |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode (watch mode) |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run lint` | Run ESLint and fix issues |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |
| `npm run test:e2e` | Run end-to-end tests |

---

## 💾 Data Storage

This API uses JSON files located in the root directory for data persistence. Files are automatically created when needed.

### Dogs Storage (`dogs.json`)

- **Automatic Creation**: Created automatically when the first dog is added
- **File Location**: Project root directory
- **Data Format**: JSON array of dog objects
- **Persistence**: All CRUD operations read from and write to this file directly

**File Structure:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Buddy",
    "age": 3,
    "breed": "Golden Retriever"
  }
]
```

### Users Storage (`users.json`)

- **Automatic Creation**: Created automatically when the first user registers
- **File Location**: Project root directory
- **Git Ignored**: This file is excluded from version control (`.gitignore`)
- **Data Format**: JSON array of user objects with hashed passwords
- **Security**: Passwords are hashed using bcrypt (10 rounds)

**File Structure:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "testuser",
    "password": "$2a$10$hashedpassword...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

> **Note**: For production applications with high traffic or concurrent access, consider migrating to a proper database (PostgreSQL, MongoDB, etc.).

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:cov
```

### End-to-End Tests
```bash
npm run test:e2e
```

---

## 🔮 Future Enhancements

- [ ] Swagger/OpenAPI documentation
- [ ] Filtering and sorting capabilities

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `npm run lint` before committing
- Run `npm run format` to format your code
- Write tests for new features

---

## 📄 License

This project is currently UNLICENSED.

---

## 👨‍💻 Author

Luiz Gustavo Andrade

---

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [NestJS GitHub](https://github.com/nestjs/nest)
- [NestJS Discord](https://discord.gg/G7Qnnhy)

---

> **Note**: This README.md was enhanced with AI