import csv
import os
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

BASE_DIR = os.path.dirname(__file__)
CSV_PATH = os.path.join(BASE_DIR, "transactions.csv")
FIELDNAMES = ["Transaction Date", "Account Number", "Account Holder Name", "Amount", "Status"]
STATUSES = ["Pending", "Settled", "Failed"]

class TransactionIn(BaseModel):
    transaction_date: str
    account_number: str
    account_holder_name: str
    amount: float

class Transaction(BaseModel):
    transaction_date: str
    account_number: str
    account_holder_name: str
    amount: float
    status: str

def read_csv():
    if not os.path.exists(CSV_PATH):
        return []
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def append_csv(row):
    file_exists = os.path.exists(CSV_PATH)
    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        if not file_exists:
            writer.writeheader()
        writer.writerow(row)

app = FastAPI(title="Transaction Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/transactions", response_model=list[Transaction])
def get_transactions():
    rows = read_csv()
    result = []
    for r in rows:
        try:
            result.append(Transaction(
                transaction_date=r["Transaction Date"],
                account_number=r["Account Number"],
                account_holder_name=r["Account Holder Name"],
                amount=float(r["Amount"]),
                status=r["Status"],
            ))
        except (KeyError, ValueError):
            continue
    return list(reversed(result))

@app.post("/transactions", response_model=Transaction, status_code=201)
def create_transaction(data: TransactionIn):
    status = random.choice(STATUSES)
    row = {
        "Transaction Date": data.transaction_date,
        "Account Number": data.account_number,
        "Account Holder Name": data.account_holder_name,
        "Amount": f"{data.amount:.2f}",
        "Status": status,
    }
    append_csv(row)
    return Transaction(
        transaction_date=data.transaction_date,
        account_number=data.account_number,
        account_holder_name=data.account_holder_name,
        amount=data.amount,
        status=status,
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)