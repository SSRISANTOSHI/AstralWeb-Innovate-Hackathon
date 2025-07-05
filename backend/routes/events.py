from flask import Blueprint, jsonify, request
from models import ApodData  # Make sure this model exists
from datetime import datetime

events_bp = Blueprint("events", __name__)

@events_bp.route("/", methods=["GET"])
def get_events_root():
    # Return all APOD events
    events = ApodData.query.all()
    return jsonify([event.serialize() for event in events])

@events_bp.route("/daily", methods=["GET"])
def get_daily_events():
    today = datetime.now().strftime("%Y-%m-%d")
    events = ApodData.query.filter_by(date=today).all()
    return jsonify([event.serialize() for event in events])

@events_bp.route("/by-date", methods=["GET"])
def get_events_by_date():
    date_str = request.args.get("date")  # Expecting YYYY-MM-DD
    if not date_str:
        return jsonify({"error": "Missing date parameter"}), 400
    events = ApodData.query.filter_by(date=date_str).all()
    return jsonify([event.serialize() for event in events])

@events_bp.route("/timeline", methods=["GET"])
def get_timeline_events():
    events = ApodData.query.order_by(ApodData.date.asc()).limit(100).all()
    return jsonify([event.serialize() for event in events])