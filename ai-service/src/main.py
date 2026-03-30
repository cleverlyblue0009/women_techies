import os
from typing import Literal, List

import httpx
from fastapi import FastAPI
from pydantic import BaseModel, Field

class RiskRequest(BaseModel):
    latitude: float
    longitude: float
    time_of_day: int = Field(..., ge=0, le=23, description='Hour of the day (0-23)')

class RiskResponse(BaseModel):
    safety_score: float
    risk_level: Literal['low', 'medium', 'high']
    news_headlines: List[str]

app = FastAPI()

NEWS_API_KEY = os.environ.get('NEWS_API_KEY', '')
BACKEND_URL = os.environ.get('BACKEND_URL', 'http://localhost:5000')

NEWS_KEYWORDS = {
    'violence': 30,
    'harassment': 20,
    'accident': 10,
    'theft': 15
}

async def fetch_news() -> List[str]:
    if not NEWS_API_KEY:
        return ['News can be configured via NEWS_API_KEY']

    url = 'https://newsapi.org/v2/everything'
    params = {
        'q': 'Vellore AND safety',
        'pageSize': 5,
        'apiKey': NEWS_API_KEY
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        payload = response.json()
        return [article['title'] for article in payload.get('articles', [])]

async def fetch_complaint_count() -> int:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f'{BACKEND_URL}/api/complaints')
            response.raise_for_status()
            return len(response.json())
    except httpx.HTTPError:
        return 0

def classify_risk(score: float) -> Literal['low', 'medium', 'high']:
    if score > 70:
        return 'low'
    if score > 45:
        return 'medium'
    return 'high'

@app.post('/predict-risk', response_model=RiskResponse)
async def predict_risk(payload: RiskRequest):
    time_penalty = 30 if payload.time_of_day < 6 or payload.time_of_day >= 22 else 0
    complaints = await fetch_complaint_count()
    complaint_penalty = complaints * 10
    headlines = await fetch_news()

    news_penalty = 0
    for headline in headlines:
        text = headline.lower()
        for keyword, penalty in NEWS_KEYWORDS.items():
            if keyword in text:
                news_penalty += penalty
    total_penalty = time_penalty + complaint_penalty + news_penalty

    safety_score = max(0, min(100, 100 - total_penalty))
    risk_level = classify_risk(safety_score)

    return RiskResponse(
        safety_score=round(safety_score, 1),
        risk_level=risk_level,
        news_headlines=headlines
    )
