from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.gemini_service import analyze_meal
import json

router = APIRouter()

@router.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    weight: float = Form(...),
    height: float = Form(...),
    age: int = Form(...),
    goal: str = Form(...),
    activity: str = Form(...)
):
    try:
        image_bytes = await image.read()
        result = analyze_meal(image_bytes, weight, height, age, goal, activity)
        
        # Clean response and parse JSON
        cleaned = result.strip().replace("```json", "").replace("```", "").strip()
        data = json.loads(cleaned)
        
        return JSONResponse(content=data)
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})