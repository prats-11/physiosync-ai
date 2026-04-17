import google.generativeai as genai
import os
from dotenv import load_dotenv
from PIL import Image

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-pro")

def analyze_food_image(image_path: str):
    image = Image.open(image_path)

    prompt = """
    Analyze this food image and return:

    1. Food name
    2. Estimated calories
    3. Macronutrients (protein, carbs, fats)
    4. Health score (out of 100)
    5. 2–3 health insights
    6. Prediction if eaten daily (weight impact)

    Return ONLY JSON format like:
    {
        "food": "",
        "calories": "",
        "protein": "",
        "carbs": "",
        "fats": "",
        "health_score": "",
        "insights": [],
        "prediction": ""
    }
    """

    response = model.generate_content([prompt, image])

    return response.text