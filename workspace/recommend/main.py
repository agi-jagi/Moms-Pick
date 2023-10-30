from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.connection import engineconnection
from routes.recommend import router as recommed_router

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

common_prefix = "/api"

engine = engineconnection()
session = engine.sessionmaker()

@app.get("/")
async def root():
    return {"message": "test"}

app.include_router(recommed_router, prefix=common_prefix, tags = ['recommend'])