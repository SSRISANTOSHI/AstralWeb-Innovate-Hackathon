from flask import Blueprint, jsonify, current_app
import requests

nasa_bp = Blueprint("nasa", __name__)

@nasa_bp.route("/", methods=["GET"])
def nasa_root():
    return jsonify({"message": "NASA API root"})


@nasa_bp.route("/apod", methods=["GET"])
def get_apod():
    # ✅ Get NASA API key from Flask config (loaded from instance/config.py)
    nasa_key = current_app.config.get("NASA_API_KEY") or "DEMO_KEY"

    try:
        res = requests.get(f"https://api.nasa.gov/planetary/apod?api_key={nasa_key}")
        res.raise_for_status()
        return jsonify(res.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "NASA API request failed", "details": str(e)}), 500
