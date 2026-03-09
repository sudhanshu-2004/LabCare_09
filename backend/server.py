from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiosqlite
import os

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = None
    inquiry_type: str = "general"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = None
    inquiry_type: str = "general"

DB_PATH = os.path.join(os.path.dirname(__file__), "labcare.db")
DATABASE_URL = os.environ.get("DATABASE_URL")

async def get_db():
    if DATABASE_URL:
        import asyncpg
        con = await asyncpg.connect(DATABASE_URL)
        return con
    else:
        db = await aiosqlite.connect(DB_PATH)
        db.row_factory = aiosqlite.Row
        return db

@app.on_event("startup")
async def startup_event():
    db = await get_db()
    
    if DATABASE_URL:
        await db.execute('''
            CREATE TABLE IF NOT EXISTS status_checks (
                id TEXT PRIMARY KEY,
                client_name TEXT,
                timestamp TEXT
            )
        ''')
        await db.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                id TEXT PRIMARY KEY,
                name TEXT,
                phone TEXT,
                email TEXT,
                message TEXT,
                inquiry_type TEXT,
                created_at TEXT
            )
        ''')
        await db.close()
    else:
        # create tables
        await db.execute('''
            CREATE TABLE IF NOT EXISTS status_checks (
                id TEXT PRIMARY KEY,
                client_name TEXT,
                timestamp TEXT
            )
        ''')
        await db.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                id TEXT PRIMARY KEY,
                name TEXT,
                phone TEXT,
                email TEXT,
                message TEXT,
                inquiry_type TEXT,
                created_at TEXT
            )
        ''')
        await db.commit()
        await db.close()

@api_router.get("/")
async def root():
    return {"message": "Labcare Instruments API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    db = await get_db()
    if DATABASE_URL:
        await db.execute('INSERT INTO status_checks (id, client_name, timestamp) VALUES ($1, $2, $3)', 
                         status_obj.id, status_obj.client_name, status_obj.timestamp.isoformat())
        await db.close()
    else:
        await db.execute('INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)', 
                         (status_obj.id, status_obj.client_name, status_obj.timestamp.isoformat()))
        await db.commit()
        await db.close()
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    db = await get_db()
    if DATABASE_URL:
        rows = await db.fetch('SELECT * FROM status_checks')
        await db.close()
    else:
        async with db.execute('SELECT * FROM status_checks') as cursor:
            rows = await cursor.fetchall()
        await db.close()
    
    results = []
    for row in rows:
        results.append(StatusCheck(
            id=row['id'],
            client_name=row['client_name'],
            timestamp=datetime.fromisoformat(row['timestamp'])
        ))
    return results

@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    if not input.name:
        raise HTTPException(status_code=422, detail="Missing name")
    if not input.phone:
        raise HTTPException(status_code=422, detail="Missing phone")
        
    lead_obj = Lead(**input.model_dump())
    db = await get_db()
    if DATABASE_URL:
        await db.execute('''
            INSERT INTO leads (id, name, phone, email, message, inquiry_type, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        ''', lead_obj.id, lead_obj.name, lead_obj.phone, lead_obj.email, lead_obj.message, lead_obj.inquiry_type, lead_obj.created_at.isoformat())
        await db.close()
    else:
        await db.execute('''
            INSERT INTO leads (id, name, phone, email, message, inquiry_type, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (lead_obj.id, lead_obj.name, lead_obj.phone, lead_obj.email, lead_obj.message, lead_obj.inquiry_type, lead_obj.created_at.isoformat()))
        await db.commit()
        await db.close()
    return lead_obj

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    db = await get_db()
    if DATABASE_URL:
        rows = await db.fetch('SELECT * FROM leads')
        await db.close()
    else:
        async with db.execute('SELECT * FROM leads') as cursor:
            rows = await cursor.fetchall()
        await db.close()
    
    results = []
    for row in rows:
        results.append(Lead(
            id=row['id'],
            name=row['name'],
            phone=row['phone'],
            email=row['email'],
            message=row['message'],
            inquiry_type=row['inquiry_type'],
            created_at=datetime.fromisoformat(row['created_at'])
        ))
    return results

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
