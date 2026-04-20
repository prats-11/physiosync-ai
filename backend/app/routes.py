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
        
        cleaned = result.strip()
        cleaned = re.sub(r'```json', '', cleaned)
        cleaned = re.sub(r'```', '', cleaned)
        cleaned = cleaned.strip()
        
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


@router.post("/chat")
async def chat(
    message: str = Form(...),
    meal_context: str = Form(default="")
):
    try:
        from app.gemini_service import client

        system_context = ""
        if meal_context:
            system_context = f"The user just analysed this meal: {meal_context}. Use this as context when relevant."

        prompt = f"""You are PhysioSync AI, an expert nutrition and fitness assistant. 
{system_context}

Answer the following question in a helpful, concise way (max 3-4 sentences). 
Focus on nutrition, fitness, health, and diet advice only.

Question: {message}"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt]
        )
        return {"reply": response.text}
    except Exception as e:
        print(traceback.format_exc())
        return {"reply": "Sorry, I couldn't process that. Please try again."}