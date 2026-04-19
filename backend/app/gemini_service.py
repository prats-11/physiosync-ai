from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
import io

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_meal(image_bytes: bytes, weight: float, height: float, age: int, goal: str, activity: str):

    prompt = f"""
You are a clinical nutrition AI and metabolism expert.

Analyze this meal image and return a JSON response ONLY. No extra text, no markdown, no backticks.

User profile:
- Weight: {weight}kg
- Height: {height}cm
- Age: {age}
- Goal: {goal}
- Activity level: {activity}

Return this exact JSON structure:
{{
  "food_name": "name of the meal",
  "calories": 000,
  "nutrition": {{
    "protein": "00g",
    "carbs": "00g",
    "fats": "00g",
    "fiber": "00g"
  }},
  "micronutrients": {{
    "calcium": "000mg",
    "iron": "0.0mg",
    "vitamin_c": "00mg",
    "vitamin_d": "00ug"
  }},
  "health_score": 00,
  "health_label": "Excellent Meal / Good Meal / Average Meal / Poor Meal",
  "tags": ["High Protein", "Low GI", "Anti-Inflam."],
  "insights": [
    "insight 1 based on user goal",
    "insight 2",
    "insight 3"
  ],
  "weight_impact_30days": "+0.0kg or -0.0kg",
  "what_if_simulations": [
    {{"meal": "Current meal daily", "impact": "-0.0kg"}},
    {{"meal": "Replace with Pizza (2 slices)", "impact": "+0.0kg"}},
    {{"meal": "Fast food combo daily", "impact": "+0.0kg"}}
  ],
  "recommendations": [
    "recommendation 1 specific to user goal",
    "recommendation 2",
    "recommendation 3"
  ]
}}
"""

    image_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image_part]
    )
    return response.text