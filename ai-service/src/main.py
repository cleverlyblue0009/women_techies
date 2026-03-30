from fastapi import FastAPI
from pydantic import BaseModel, Field
from random import uniform
from typing import Literal

class SafetyRequest(BaseModel):
    latitude: float
    longitude: float
    time_of_day: int = Field(..., ge=0, le=23, description='Hour of the day (0-23)')

class SafetyResponse(BaseModel):
    safety_score: float
    risk_level: Literal['low', 'medium', 'high']

app = FastAPI()

HIGH_ALERT_ZONES = [
    (28.7041, 77.1025),
    (19.0760, 72.8777)
]

def calculate_safety(latitude: float, longitude: float, hour: int) -> SafetyResponse:
    base_score = 80.0
    if hour < 6 or hour > 21:
        base_score -= 30

    proximity_penalty = 0
    for zone_lat, zone_lng in HIGH_ALERT_ZONES:
        if abs(zone_lat - latitude) < 0.5 and abs(zone_lng - longitude) < 0.5:
            proximity_penalty = 25
            break

    random_variation = uniform(-10, 10)
    raw_score = base_score - proximity_penalty + random_variation
    score = max(0, min(100, raw_score))

    if score > 70:
        risk = 'low'
    elif score > 45:
        risk = 'medium'
    else:
        risk = 'high'

    return SafetyResponse(safety_score=round(score, 1), risk_level=risk)


@app.post('/predict-safety', response_model=SafetyResponse)
def predict_safety(payload: SafetyRequest):
    return calculate_safety(payload.latitude, payload.longitude, payload.time_of_day)
