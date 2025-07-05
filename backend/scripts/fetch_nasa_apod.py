import requests
import mysql.connector
from datetime import datetime, timedelta

# MySQL connection setup
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='sathvika',
    database='nasa_db'
)
cursor = conn.cursor()

# Create table if not exists
cursor.execute("""
CREATE TABLE IF NOT EXISTS apod_data (
    date DATE PRIMARY KEY,
    title VARCHAR(255),
    explanation TEXT,
    url TEXT,
    media_type VARCHAR(50)
)
""")

# NASA API setup
API_KEY = 'SgweybGWldZwL0bsKiGIited1QGd1uoadMaRrnKJ'  
API_URL = 'https://api.nasa.gov/planetary/apod'

# Start and end dates for the loop
start_date = datetime(1995, 6, 16)  # APOD start date
end_date = datetime.today()

current_date = start_date
while current_date <= end_date:
    date_str = current_date.strftime('%Y-%m-%d')
    params = {
        'api_key': API_KEY,
        'date': date_str
    }
    response = requests.get(API_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        # Insert into MySQL (use REPLACE INTO to avoid duplicates)
        sql = """
        REPLACE INTO apod_data (date, title, explanation, url, media_type) 
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (
            data.get('date'),
            data.get('title'),
            data.get('explanation'),
            data.get('url'),
            data.get('media_type')
        )
        cursor.execute(sql, values)
        conn.commit()
        print(f"Inserted data for {date_str}")
    else:
        print(f"Failed to get data for {date_str}: {response.status_code}")
    current_date += timedelta(days=1)

cursor.close()
conn.close()
