from pydantic import BaseModel

class TransactionIn(BaseModel):
    transaction_date: str
    account_number: str
    account_holder_name: str
    amount: float


class Transaction(TransactionIn):
    status: str