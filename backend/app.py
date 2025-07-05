import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from utils.apod_scheduler import fetch_daily_apod  # NEW: import scheduler job

from models import db
from routes.events import events_bp
from routes.nasa import nasa_bp

# 🔧 Serve React frontend build from Flask
app = Flask(
    __name__,
    static_folder="../build",  # ✅ fixed path to point to correct build folder
    static_url_path=""
)

# Load DB config
app.config.from_pyfile("instance/config.py")

# Enable CORS
CORS(app)

# Initialize DB
db.init_app(app)

# Register API Blueprints
app.register_blueprint(events_bp, url_prefix="/api/events")
app.register_blueprint(nasa_bp, url_prefix="/api/nasa")

# ✅ Route all frontend requests to index.html (SPA support)
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    build_dir = os.path.join(os.path.dirname(__file__), "../build")  # ✅ correct build folder
    file_path = os.path.join(build_dir, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    else:
        return send_from_directory(build_dir, "index.html")

# ✅ Test endpoint to confirm backend works
@app.route("/test")
def test():
    return "✅ Flask backend is working!"

# ✅ Start daily scheduler for NASA APOD
scheduler = BackgroundScheduler()
scheduler.add_job(func=fetch_daily_apod, trigger="interval", hours=24)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())

# ▶️ Run Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
