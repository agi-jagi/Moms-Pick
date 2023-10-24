from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.connection import engineconnection

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://localhost",
    "https://localhost:8080",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = engineconnection()
session = engine.sessionmaker()

@app.get("/")
async def root():
    return {"message": "test"}