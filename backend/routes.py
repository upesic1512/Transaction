import random
from fastapi import APIRouter
from models import Transaction, TransactionIn
from services import read_csv, append_csv

router = APIRouter()

STATUSES = ["Pending", "Settled", "Failed"]


@router.get("/transactions", response_model=list[Transaction])
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
        except:
            continue

    return list(reversed(result))


@router.post("/transactions", response_model=Transaction, status_code=201)
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

    return Transaction(**data.dict(), status=status)