from flask import current_app
import requests
from datetime import datetime
from models import db, ApodData

def fetch_daily_apod():
    api_key = current_app.config.get("NASA_API_KEY")
    if not api_key:
        print("NASA API key not found.")
        return

    today = datetime.today().strftime("%Y-%m-%d")
    url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}&date={today}"

    try:
        res = requests.get(url)
        data = res.json()

        if "title" not in data or "url" not in data:
            print("Incomplete APOD data.")
            return

        # Check if already exists
        existing = ApodData.query.filter_by(date=today).first()
        if existing:
            print("APOD for today already exists.")
            return

        # Insert new APOD
        new_apod = ApodData(
            date=today,
            title=data["title"],
            explanation=data.get("explanation", ""),
            url=data["url"],
            media_type=data.get("media_type", "image")
        )
        db.session.add(new_apod)
        db.session.commit()
        print(f"✔️ APOD inserted for {today}")

    except Exception as e:
        print("❌ Error fetching APOD:", e)
