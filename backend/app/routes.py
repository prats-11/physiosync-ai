from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.gemini_service import analyze_meal
import json
import re
import traceback

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
        
        # Clean response
        cleaned = result.strip()
        cleaned = re.sub(r'```json', '', cleaned)
        cleaned = re.sub(r'```', '', cleaned)
        cleaned = cleaned.strip()
        
        # Find JSON object
        start = cleaned.find('{')
        end = cleaned.rfind('}') + 1
        if start != -1 and end != 0:
            cleaned = cleaned[start:end]
        
        data = json.loads(cleaned)
        return JSONResponse(content=data)
    
    except Exception as e:
        print(f"ERROR: {str(e)}")
        print(traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": str(e)})