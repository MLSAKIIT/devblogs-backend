# DevBlogs Backend

## Overview

This is the backend API for DevBlogs, a Full Stack Blogging site for Developers by Developers. It's part of the MLSA HACKTOBER 2024: WEBDEV project.

## Tech Stack

- Express.js as the web application framework
- MongoDB for database management
- Mongoose for MongoDB object modeling
- JSON Web Tokens (JWT) for authentication
- Swagger for API documentation

## Features

1. User authentication and authorization
2. Blog post creation and retrieval
3. Pagination for blog posts
4. Request body validation
5. Rate limiting
6. CORS protection
7. API documentation with Swagger

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the backend directory of the project.
3. Install the required dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Set up your environment variables:
   - Create a `.env` file in the backend directory.
   - Add necessary variables such as `MONGODB_URI` and `JWT_SECRET`.
5. Start the server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
6. The backend should now be running, typically on http://localhost:3000.
7. Access the Swagger documentation at http://localhost:3000/api-docs.

## Installation with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/MLSAKIIT/devblogs-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd devblogs-backend
   ```

3. Configure your .env file:

   *Before running Docker, ensure you have correctly set up your environment variables.*

4. Run the following command to start the application:
   ```bash
   docker compose up -d   
   ```

## Folder Structure

```
.
├── controllers/
│   └── auth.js
├── index.js
├── models/
│   ├── Blogs.js
│   └── User.js
├── package.json
├── routes/
│   ├── auth.js
│   └── blog.js
└── utils/
    └── jwtHelper.js
```

## API Routes

- `/register`: User registration
- `/login`: User login
- `/get-blogs`: Retrieve blog posts (with pagination)
- `/create-blog`: Create a new blog post (protected route)
- `/get-featured-blog`: Retrieve featured blog posts
- `/verify`: Verify JWT token

For detailed API documentation, refer to the Swagger UI at `/api-docs` when the server is running.

## Contributing

We welcome contributions to improve this project! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Issues & Features
- User authentication with hashed passwords.
- Input validation with `joi`.
- Rate limiting and CORS protection.
- Route protection using middleware.
- Swagger for API documentation.
- Error handling middleware.
  
Check the main project documentation for a list of current issues and tasks for the backend.

## References

- Mongoose with Express:
  - https://www.youtube.com/watch?v=_7UQPve99r4
  - https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial
- Authentication (JWT):
  - https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/
  - https://www.youtube.com/watch?v=mbsmsi7l3r4
- Route protection through middleware:
  - https://expressjs.com/en/guide/writing-middleware.html
  - https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49
- Dynamic routes in Express:
  - https://sourcebae.com/blog/how-dynamic-routing-works-in-express-js/
  - https://www.scaler.com/topics/expressjs-tutorial/express-query-params/
- Express rate limiting:
  - https://www.npmjs.com/package/express-rate-limit
  - https://blog.appsignal.com/2024/04/03/how-to-implement-rate-limiting-in-express-for-nodejs.html
- Validation using JOI:
  - https://www.npmjs.com/package/express-joi-validation
  - https://abbaslanbay.medium.com/introduction-to-joi-validation-in-node-js-express-c33eba38f4ae
- Pagination:
  - https://javascript.works-hub.com/learn/how-to-create-a-paginated-api-with-mongodb-and-node-js-6e1e3
  - https://www.geeksforgeeks.org/how-to-paginate-with-mongoose-in-node-js/
- Express CORS:
  - https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
- Error Handling in Express:
  - https://expressjs.com/en/guide/error-handling.html
  - https://www.turing.com/kb/how-to-master-express-js-error-handling
- Middlewares:
  - https://www.geeksforgeeks.org/middleware-in-express-js/
- Swagger Documentation:
  - https://swagger.io/docs/specification/about/
  - https://www.npmjs.com/package/swagger-ui-express
  - https://www.npmjs.com/package/swagger-jsdoc