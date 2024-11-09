from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase
from datetime import datetime, timedelta



class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)


    # You may modify the return value as needed to support other functionality
    return quote

# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quote")
def get_messages(range: str = ''):
    '''
        retrieve quotes that are newer than max_age
    '''

    quotes_in_range = []
    now = datetime.now()
    if range == "week":
        cutoff_date = now - timedelta(weeks=1)
    elif range == "year":
        cutoff_date = datetime(now.year - 1, now.month, now.day)  
    elif range == "month":
        cutoff_date = now - timedelta(days=30) 
    elif range == "all":
        return database["quotes"]
    for quote in database["quotes"]:
        if datetime.fromisoformat(quote["time"]) >= cutoff_date:
            quotes_in_range.append(quote)
    print(quotes_in_range[::-1])
    return quotes_in_range[::-1] #makes most recent quote first by reversing list
