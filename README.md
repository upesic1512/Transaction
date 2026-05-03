# Transaction Management System

## Overview

This is a full-stack Transaction Management System for managing financial transactions.

It consists of:
- Python backend API
- React (Vite) frontend
- CSV file storage (no database)


---

## Prerequisites

You need to install:

- Python (3.10+)
- Node.js (LTS version)
- Git (optional)

---

## Backend Setup (Python API)

### Install Python
Download: https://python.org/downloads

During installation:
✔ Check "Add Python to PATH"

Verify installation:
python --version

---

### Install dependencies

Run:

cd backend
pip install -r requirements.txt

---

### Start backend server

Run:

python main.py

Backend runs on:
http://localhost:8000

---

## Frontend Setup (React + Vite)

### Install Node.js
Download: https://nodejs.org (LTS version)

Verify:

node --version
npm --version

---

### Install dependencies

Run:

cd frontend
npm install

---

### Start frontend

Run:

npm run dev

Frontend runs on:
http://localhost:5173

---

## API Documentation

### GET /transactions

Returns all transactions.

Response example:

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

### POST /transactions

Adds a new transaction.

Request body:

{
  "transaction_date": "2026-01-01",
  "account_number": "1234-5678-9999",
  "account_holder_name": "John Doe",
  "amount": 100.50
}

Backend automatically assigns:
- Pending
- Settled
- Failed

and saves to CSV file.

---

## CSV Data Format

Transaction Date | Account Number | Account Holder Name | Amount | Status

Example:
2025-03-01 | 7289-3445-1121 | Maria Johnson | 150.00 | Settled

---

## Features

- Transaction table
- Add transaction modal
- Status badges:
  - Pending (yellow)
  - Settled (green)
  - Failed (red)
- Auto update after adding transaction

---

## How to Run Everything

Backend:

cd backend
pip install -r requirements.txt
python main.py

Frontend:

cd frontend
npm install
npm run dev

Open:
http://localhost:5173

---

## Testing Flow

1. Start backend
2. Start frontend
3. Open browser
4. View transactions
5. Add new transaction
6. See update in table

---

## Technical Notes

- No database (CSV only)
- No authentication
- Simple REST API
- React hooks for state management
- API calls between frontend and backend

---

## Possible Improvements

- Replace CSV storage with a real database (PostgreSQL / MongoDB / SQLite)
- Add authentication and authorization (JWT-based login system)
- Implement pagination and filtering for transactions
- Add sorting (by date, amount, status, etc.)
- Implement search functionality (e.g. by account number or name)
- Improve backend concurrency handling (avoid race conditions when writing to CSV/database)
- Add Docker support for both backend and frontend
- Implement proper environment configuration (.env files)
- Add cloud deployment (e.g. Vercel for frontend, Render/AWS for backend)
---
