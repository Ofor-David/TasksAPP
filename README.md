# TasksAPP

This MERN stack APP allows users to manage their tasks efficiently. Users can register, log in, and perform CRUD operations on their tasks. The API integrates a simple react frontend and ensures that each user's data is secure and accessible only to them using jwt.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Ofor-David/TasksAPI.git
    ```
2. Navigate to the project directory:
    ```sh
    cd tasksapi
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your MongoDB URL, port and jwt secret:
    ```env
    mongodb_url=your_mongodb_url
    port=your_port
    JWT_SECRET=your jwt secret
    ```

## Usage

To start the server in development mode:
```sh
npm run dev
```

To start the server in production mode:
```sh
npm start
```

## Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task for the authenticated user
- `GET /api/tasks/:id` - Get an authenticated user's task by ID
- `PUT /api/tasks/:id` - Update an authenticated user's task by ID
- `DELETE /api/tasks/:id` - Delete an authenticated user's task by ID

### Users

- `POST /api/users/register` - Create a new user
- `POST /api/users/login` - Login as an existing user
- `GET /api/users/profile` - Get your user profile
- `DELETE /api/users/profile` - Delete your user

## License

This project is licensed under the MIT License.