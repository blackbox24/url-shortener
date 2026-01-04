import logging
from datetime import datetime, timedelta
from typing import List

import uvicorn
from decouple import Csv, config
from fastapi import FastAPI, status
from pydantic import BaseModel, HttpUrl, Field

# --- Configuration ---
LOG_FORMAT = "%(levelname)s: %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
logger = logging.getLogger(__name__)

CSRF_TRUSTED_ORIGINS = config("CSRF_TRUST_ORIGINS", cast=Csv(), default=[])

# --- Schemas (Models) ---
class UrlBase(BaseModel):
    original_url: HttpUrl

class UrlCreate(UrlBase):
    """Schema for incoming shortening requests."""
    # Optional: allow user to set custom expiration, otherwise default in logic
    custom_expiry_days: int = Field(default=30, ge=1, le=365)

class UrlResponse(UrlBase):
    """Schema for outgoing responses."""
    hashed_url: str
    created_at: datetime
    expiration_date: datetime

    class Config:
        from_attributes = True

# --- App Initialization ---
def create_app() -> FastAPI:
    app = FastAPI(title="URL Shortener API")

    from fastapi.middleware.cors import CORSMiddleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=CSRF_TRUSTED_ORIGINS, # type: ignore
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app

app = create_app()

# --- Routes ---
@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/shorten-url/", response_model=UrlResponse, status_code=status.HTTP_201_CREATED)
async def shorten_url(payload: UrlCreate):
    """
    Logic to shorten a URL. 
    In a real app, you would generate the hash and save to a DB here.
    """
    # Dummy logic for demonstration
    dummy_hash = "xK92bL" 
    created_now = datetime.utcnow()
    expiry = created_now + timedelta(days=payload.custom_expiry_days)
    
    return {
        "original_url": payload.original_url,
        "hashed_url": dummy_hash,
        "created_at": created_now,
        "expiration_date": expiry
    }

if __name__ == "__main__":
    logger.info(f"Starting server with origins: {CSRF_TRUSTED_ORIGINS}")
    # Note: Use "main:app" if this file is named main.py
    uvicorn.run("main:app", host="0.0.0.0", port=9000, reload=True)
