from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ApodData(db.Model):
    __tablename__ = 'apod_data'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), unique=True)  # Ensure one APOD per date
    title = db.Column(db.String(255), nullable=False)
    explanation = db.Column(db.Text)
    url = db.Column(db.String(255))
    media_type = db.Column(db.String(50))

    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'title': self.title,
            'description': self.explanation,
            'source': self.url,
            'media_type': self.media_type
        }
