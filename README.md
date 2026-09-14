# Chitta Shanti

## AI-Based Personnel Stress and Welfare Monitoring System

Chitta Shanti is an AI-assisted personnel stress and welfare monitoring system designed for CAPFs and armed forces personnel.

The system aims to support personnel wellbeing and operational readiness by combining assessment data, AI-based stress analysis, and role-specific welfare workflows.

The application is designed around three primary user roles:

- Candidate
- Commander
- Medical Officer

Each role receives a dedicated interface and access to functionality appropriate to its responsibilities.

---

## Current Project Status

The project currently contains a working React frontend and FastAPI backend.

### Implemented

- Candidate, Commander, and Medical Officer role structure
- User registration
- User login
- JWT-based authentication
- Role-aware frontend routing
- Authenticated user profile retrieval
- Candidate profile page
- Authenticated user information in the navigation bar
- Logout and session clearing
- Commander dashboard UI
- Medical Officer dashboard UI
- Welfare triage integration
- Welfare intervention recording
- Candidate assessment workflow UI
- Backend MongoDB integration
- FastAPI API documentation through Swagger

### Currently Being Developed

- Candidate assessment submission integration
- Submission of questionnaire responses to the backend
- Assessment result integration
- Assessment history

The assessment history interface is intentionally pending until the corresponding backend functionality is implemented.

---

# System Architecture

```text
                    ┌───────────────────────┐
                    │        User           │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    React + Vite       │
                    │       Frontend        │
                    └───────────┬───────────┘
                                │
                         HTTP / REST API
                                │
                                ▼
                    ┌───────────────────────┐
                    │       FastAPI         │
                    │        Backend        │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
             ┌──────────────┐       ┌──────────────┐
             │   MongoDB    │       │ AI / Video   │
             │   Database   │       │  Processing  │
             └──────────────┘       └──────────────┘
```

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Backend

- Python
- FastAPI
- Uvicorn
- PyMongo
- MongoDB
- Passlib
- bcrypt
- Python-JOSE
- OpenCV
- MediaPipe
- Librosa

---

# Project Structure

```text
Chitta Shanti/
│
├── Backend/
│   ├── api/
│   │   ├── assessment_api.py
│   │   └── auth_api.py
│   │
│   ├── pipelines/
│   │   ├── pipeline_utils.py
│   │   └── video_processing.py
│   │
│   ├── database.py
│   ├── main.py
│   ├── models_db.py
│   ├── requirements.txt
│   └── .venv/              # Local only, not committed
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# Backend Setup

## Requirements

Install:

- Python 3.10+
- MongoDB
- Node.js and npm for the frontend

The backend has been tested with Python 3.13.1 and MongoDB 8.3.11 during development.

---

## 1. Navigate to the Backend

```bash
cd Backend
```

---

## 2. Create a Virtual Environment

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file inside `Backend/`.

Example:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=stress_detector
```

Do not commit the actual `.env` file to GitHub.

---

## 5. Start MongoDB

MongoDB must be running before starting the backend.

The default database configuration is:

```text
MongoDB URI: mongodb://localhost:27017
Database:    stress_detector
```

These values can be overridden through the `.env` file.

---

## 6. Start the FastAPI Server

From the `Backend` directory:

```bash
python -m uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open a second terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Authentication

Chitta Shanti uses JWT-based authentication.

## Supported Roles

### Candidate

Candidates can:

- Start a new assessment
- Record an assessment response
- Complete the wellbeing questionnaire
- View their profile
- Log out

### Commander

Commanders can access:

- Command Centre
- Personnel information
- Profile

### Medical Officer

Medical Officers can access:

- Medical Dashboard
- Welfare triage
- Welfare interventions
- Profile

---

# Authentication API

## Register

```http
POST /api/auth/register
```

Request body:

```json
{
  "Username": "test_candidate",
  "full_name": "Test Candidate",
  "password": "Test@12345",
  "role": "candidate",
  "unit_id": "UNIT-TEST"
}
```

---

## Login

```http
POST /api/auth/login
```

The endpoint expects form-encoded credentials:

```text
username=<username>
password=<password>
```

Successful authentication returns:

```json
{
  "access_token": "...",
  "token_type": "bearer",
  "role": "candidate"
}
```

---

## Current User

```http
GET /api/auth/me
```

Requires:

```http
Authorization: Bearer <access_token>
```

Example response:

```json
{
  "user_id": "test_candidate",
  "full_name": "Test Candidate",
  "role": "candidate",
  "unit_id": "UNIT-TEST"
}
```

---

# Assessment API

The backend currently exposes the full evaluation endpoint:

```http
POST /api/assessment/full-evaluate
```

The endpoint accepts:

- Assessment video
- Duty-hours streak
- Relaxation hours preceding the assessment

Authentication is required.

The endpoint returns information including:

- Session ID
- Personnel ID
- Readiness status
- Classification
- Stress probability
- SHAP attribution
- Timestamp

The frontend assessment workflow is currently being integrated with this endpoint.

Questionnaire submission is planned for the next stage of backend development.

---

# Welfare API

## Commander Roster

```http
GET /api/assessment/commander/roster
```

Accessible to:

- Commander
- Medical Officer

---

## Welfare Triage

```http
GET /api/assessment/welfare/triage
```

Accessible to:

- Medical Officer

---

## Record Welfare Intervention

```http
POST /api/assessment/welfare/interventions
```

Example:

```json
{
  "personnel_id": "PERSONNEL_ID",
  "action_type": "Mandatory Rest",
  "notes": "Recommended additional rest and follow-up."
}
```

Accessible to:

- Medical Officer

---

# Frontend Authentication Flow

```text
User
 │
 ▼
Login Page
 │
 ▼
POST /api/auth/login
 │
 ▼
JWT + Role
 │
 ▼
localStorage
 │
 ├───────────────┐
 ▼               ▼
RoleRoute      /api/auth/me
 │               │
 ▼               ▼
Dashboard       Profile
```

Logout clears the stored authentication information and redirects the user to the login page.

---

# Candidate Assessment Flow

The current frontend assessment workflow consists of four stages:

```text
1. Prompt
      ↓
2. Video Recording
      ↓
3. Wellbeing Questionnaire
      ↓
4. Assessment Result
```

The current frontend captures the recorded video as a browser `Blob`.

Backend integration is being developed so that the recorded video and questionnaire information can be submitted to the appropriate API.

---

# Privacy and Security

The system is designed around role-based access control.

Authentication is enforced through JWT tokens, while backend endpoints restrict access based on user roles.

The frontend does not display or store user passwords.

Environment files containing credentials or secrets must not be committed to the repository.

For a production deployment, additional security controls should be implemented, including:

- Secure secret management
- HTTPS
- Production CORS configuration
- Stronger token/session management
- Appropriate data-access auditing

---

# Development Notes

This repository is currently under active development.

Some frontend elements are placeholders where the backend functionality has not yet been implemented.

In particular:

- Assessment history requires a backend history endpoint.
- Rank/designation is not currently returned by `/api/auth/me`.
- Assessment statistics such as total assessments and last check-in require corresponding backend data.
- Questionnaire submission is currently being redesigned for backend integration.

These values should not be treated as production data until their corresponding backend functionality is implemented.

---

# Running the Project Locally

Start MongoDB first.

Then run the backend:

```bash
cd Backend
```

### Windows

```powershell
.venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```

In a second terminal, run the frontend:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

Backend API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Project Goal

Chitta Shanti aims to provide an AI-assisted framework for identifying personnel stress indicators and supporting welfare-oriented decision making while maintaining role-appropriate access to sensitive assessment information.

The system separates operational readiness information from detailed welfare information so that different levels of personnel receive information appropriate to their responsibilities.

---

## Status

**Active Development**

The current milestone focuses on establishing the complete authentication and role-based application foundation before integrating the candidate assessment submission pipeline.