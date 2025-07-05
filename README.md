Cosmic Chronicles - README
1. Installation and Setup Instructions
Follow the steps below to set up and run Cosmic Chronicles locally:

Frontend (React):
1. Navigate to the frontend folder: cd frontend
2. Install dependencies: npm install
3. Run the development server: npm start
4. Build production version: npm run build (used when integrating with Flask backend)

Backend (Flask):
1. Navigate to the backend folder: cd backend
2. Create and activate a virtual environment: python -m venv venv && source venv/bin/activate
3. Install dependencies: pip install -r requirements.txt
4. Ensure MySQL is running and database is created (e.g., cosmic_db)
5. Add your NASA API key to instance/config.py: NASA_API_KEY = "your_api_key_here"
6. Run Flask server: python app.py

Database:
1. Create a MySQL database named: cosmic_db (or your configured name)
2. Tables will be auto-generated with db.create_all() from app context.

2. Website Functionality and Unique Features
Cosmic Chronicles is a space-themed astronomical event calendar and exploration platform. Key features include:

- 🌌 Daily Astronomy History Events: View past space missions and historical events for today’s date.
- 📸 NASA APOD Integration: View and store NASA's Astronomy Picture of the Day.
- 🔖 Bookmark System: Save favorite events for quick access.
- 📅 Calendar View: Select any date to explore space history on that day.
- 🧠 Quiz Popups: Test your knowledge with date-based space quizzes.
- 🌐 Multilingual Support: Toggle between English and Hindi.
- 🌗 Light/Dark Theme Toggle: Seamlessly switch themes across the entire UI.
- 🗺️ Timeline View: Visualize major space milestones in a scrollable timeline.
- 🛰️ API-based and Real-Time Data Fetching.
- 📱 Fully Responsive Design and Offline-ready PWA structure (optional).

3. Dependencies
Frontend (React):
- React.js
- react-router-dom
- axios
- react-i18next
- react-datepicker
- Web Speech API (if using voice input)
- Normal CSS or TailwindCSS (if extended)

Backend (Flask):
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- PyMySQL
- Requests
- APScheduler (for auto-fetching NASA data)

Database:
- MySQL (with user access and database named cosmic_db)

Other Tools:
- NASA APOD API (https://api.nasa.gov)
- Git for version control
- serve (optional for static build preview)

![image](https://github.com/user-attachments/assets/50fb9676-5a21-4d88-8b6d-8fe66864c391)

