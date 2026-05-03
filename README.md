# Transaction Management System

## Overview

This is a full-stack Transaction Management System that allows users to view and add financial transactions.

It consists of a Python backend API, a React frontend application, and CSV file storage used as a simple database.

No authentication or complex configuration is required.

---

## Project Structure

transaction/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── transactions.csv
└── frontend/
    ├── src/
    │   ├── api/transactions.js
    │   ├── components/
    │   │   ├── AddTransactionModal.jsx
    │   │   ├── FormField.jsx
    │   │   ├── StatusBadge.jsx
    │   │   ├── Toast.jsx
    │   │   └── TransactionTable.jsx
    │   ├── hooks/
    │   │   ├── useTransactionForm.js
    │   │   └── useTransactions.js
    │   ├── styles/global.css
    │   ├── App.jsx
    │   ├── App.module.css
    │   └── main.jsx
    ├── vite.config.js
    └── package.json

---

## Prerequisites

Before running the project you need to install:
Python (version 3.10 or higher)
Node.js (LTS version recommended)
Git (optional)

---

## Backend Setup (Python API)

First, install Python from python.org/downloads and make sure to check "Add Python to PATH" during installation. You can verify installation by running python --version in your terminal.

Then navigate to the backend folder and install dependencies using pip install -r requirements.txt.

After installation, start the backend server by running python main.py. The backend will run on http://localhost:8000.

---

## Frontend Setup (React + Vite)

Install Node.js from nodejs.org (LTS version). Verify installation using node --version and npm --version.

Then navigate to the frontend folder and install dependencies using npm install.

Start the frontend application using npm run dev. The frontend will run on http://localhost:5173.

---

## API Documentation

GET /transactions
Returns all transactions stored in the CSV file.

Example response:
[
  {
    "transaction_date": "2025-03-01",
    "account_number": "7289-3445-1121",
    "account_holder_name": "Maria Johnson",
    "amount": 150.0,
    "status": "Settled"
  }
]

---

POST /transactions
Adds a new transaction.

Request body example:
{
  "transaction_date": "2026-01-01",
  "account_number": "1234-5678-9999",
  "account_holder_name": "John Doe",
  "amount": 100.50
}

The backend automatically assigns a random status: Pending, Settled, or Failed, and saves the transaction into the CSV file.

---

## Data Format

Transactions are stored in a CSV file in the following format:
Transaction Date, Account Number, Account Holder Name, Amount, Status

Example:
2025-03-01, 7289-3445-1121, Maria Johnson, 150.00, Settled

---

## Features

The application includes:
A transaction table displaying all records
A modal form for adding new transactions
Status indicators (Pending, Settled, Failed)
Automatic UI update after adding a transaction

---

## How to Run the Project

To run the full application:

Start backend: navigate to backend folder, install requirements, and run python main.py
Start frontend: navigate to frontend folder, run npm install, then npm run dev
Open browser at http://localhost:5173

---

## Testing Flow

Start backend server
Start frontend application
Open application in browser
View transactions table
Add a new transaction using the form
Verify that the new transaction appears in the table

---

## Technical Notes

The project does not use a database; all data is stored in a CSV file. There is no authentication system. The backend is a simple REST API, while the frontend uses React hooks for state management. Communication between frontend and backend is handled via API calls.

---

## Possible Improvements

This project can be improved by adding a real database such as PostgreSQL or MongoDB, implementing authentication, adding pagination and filtering, improving form validation, containerizing with Docker, and deploying to cloud platforms such as Vercel or Render.

---

## License

This project is intended for educational and demo purposes only.
