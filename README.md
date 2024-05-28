# FinTrack

**FinTrack: Your Personal Finance Assistant**

FinTrack is a backend system designed to help you manage your personal finances effortlessly. It includes features like user registration, income and expense tracking, budget creation, monthly financial reports, and category-wise expense tracking.

## Features

- **User Registration and Authentication**: Secure user login and registration.
- **Income and Expense Tracking**: CRUD operations for managing income and expenses.
- **Budget Creation and Tracking**: Set and monitor budgets.
- **Monthly Financial Reports**: Generate detailed reports for better financial insight.
- **Category-wise Expense Tracking**: Track expenses by categories such as groceries, rent, and entertainment.

## Technologies Used

- **Node.js** with **Express** for the server.
- **Prisma** for database management.
- **JWT** for user authentication.
- **MySQL** as the database.

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Smoke221/FinTrack.git
    cd FinTrack
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Create a MySQL database.
    - Update the `.env` file with your database credentials:
        ```env
        PORT = 3000
        DATABASE_URL="mysql://username:password@host:port/database"
        JWT_SECRET="your_jwt_secret"
        ```

4. Run Prisma migrations to create the tables:
    ```sh
    npx prisma migrate dev
    ```

5. Generate Prisma client:
    ```sh
    npx prisma generate
    ```

### Running the Server

Start the server:
```sh
node index.js
```
The server will be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### User Registration and Login:

- `POST /auth/signup`: Register a new user.
- `POST /auth/login`: Login an existing user.

### Transactions:

- `GET /transactions`: Get all transactions for the logged-in user.
- `POST /transactions`: Create a new transaction.
- `PUT /transactions/:id`: Update a transaction.
- `DELETE /transactions/:id`: Delete a transaction.

### Categories:

- `GET /categories`: Get all categories.
- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update a category.
- `DELETE /categories/:id`: Delete a category.
- `GET /categories/:id/expenses`: Get all expenses for a specific category.
- `GET /categories/:id/expenses/total`: Get the total expenses for a specific category.

### Budgets:

- `GET /budgets`: Get all budgets for the logged-in user.
- `POST /budgets`: Create a new budget.
- `PUT /budgets/:id`: Update a budget.
- `DELETE /budgets/:id`: Delete a budget.

### Reports:

- `GET /reports/monthly?month=&year=`: Get a monthly financial report.

