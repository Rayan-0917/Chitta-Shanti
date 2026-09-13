# Chitta Shanti — Frontend

> **AI-Based Personnel Stress and Welfare Monitoring System for CAPFs / Armed Forces**

Chitta Shanti is a web-based frontend for an AI-assisted personnel stress and welfare monitoring platform designed for personnel in CAPFs and the Armed Forces. The system is intended to support early identification of stress indicators, structured assessments, and role-based welfare intervention.

This repository contains the **React + Vite frontend** of the project.

---

## Project Overview

Personnel working in high-pressure operational environments can experience prolonged psychological and occupational stress. Chitta Shanti aims to provide a structured digital platform through which personnel can complete assessments while authorized officers can review relevant information and coordinate welfare interventions.

The frontend is being developed around three primary user roles:

- **Candidate / Personnel** — completes stress assessments and views assessment history and profile.
- **Commander** — accesses personnel rosters and relevant welfare information.
- **Medical Officer** — handles welfare triage and intervention-related workflows.

---

## Core Features

### Authentication
- Login interface
- Registration interface
- Role-based access architecture
- Protected routes
- Authentication context for maintaining user state

### Candidate Portal
The intended candidate workflow is:
1. Receive an assessment question
2. Record a video response
3. Complete a structured questionnaire
4. Submit the assessment
5. View the resulting assessment information
6. Review previous assessment history
7. View profile information

### Commander Portal
Planned functionality includes:
- Personnel roster
- Personnel-level welfare information
- Stress-risk overview
- Appropriate intervention workflows

### Medical / Welfare Portal
Planned functionality includes:
- Welfare triage
- Identification of personnel requiring attention
- Intervention management
- Follow-up welfare workflows

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development server and build tooling |
| Tailwind CSS | Styling and responsive UI |
| React Router | Client-side routing |
| Lucide React | UI icons |
| Axios | API communication |

### Backend

The frontend is designed to communicate with a FastAPI-based backend.

Backend repository:  
https://github.com/Shrestha-Ain/Stress_Detector

The backend uses technologies including FastAPI, MongoDB, JWT-based authentication, role-based access control, and AI/ML-based assessment processing.

---

## Project Structure

```text
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   └── assessmentApi.js
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── candidate/
│   │   │   ├── assessment/
│   │   │   ├── history/
│   │   │   └── profile/
│   │   ├── commander/
│   │   ├── home/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HeroBackground.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── welfare/
│   │   └── common/
│   │       ├── ProtectedRoute.jsx
│   │       ├── Navbar.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── ErrorBanner.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useMediaRecorder.js
│   ├── pages/
│   │   ├── Homepage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── candidate/
│   │   ├── commander/
│   │   └── welfare/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── router.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

---

## Application Architecture

```text
                        Chitta Shanti
                              │
                       React Frontend
                              │
             ┌────────────────┼────────────────┐
             │                │                │
          Candidate        Commander      Medical Officer
             │                │                │
        Assessment          Roster          Welfare
             │                              Triage
      ┌──────┼──────┐                    Intervention
      │      │      │
   Question Video Questionnaire
      │      │      │
      └──────┼──────┘
             │
          Results
```

API communication is separated from UI components through `src/api/`, while authentication state is handled through React context and protected routes.

---

## Assessment Workflow

The intended candidate assessment flow is:

```text
Start Assessment
       │
       ▼
Receive Question
       │
       ▼
Record Video Response
       │
       ▼
Submit Video
       │
       ▼
Complete Questionnaire
       │
       ▼
Submit Answers
       │
       ▼
Assessment Processing
       │
       ▼
View Result
```

The backend is responsible for processing submitted assessment data and generating the relevant evaluation.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

Check your versions:

```bash
node --version
npm --version
```

### Installation

Clone the repository and enter the frontend directory:

```bash
git clone <YOUR-FRONTEND-REPOSITORY-URL>
cd frontend
npm install
```

---

## Environment Variables

Create a local `.env` file and use `.env.example` as a reference.

Example:

```env
VITE_API_URL=http://localhost:8000
```

> **Security:** Do not place private API keys, database credentials, JWT signing secrets, or other backend secrets in Vite environment variables. Frontend environment variables are exposed to the browser.

---

## Running the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

## Routing

Client-side routing is handled using React Router.

The application is organized around routes such as:

```text
/
├── /login
├── /register
├── /candidate
│   ├── assessment
│   ├── history
│   └── profile
├── /commander
│   └── roster
└── /welfare
    ├── triage
    └── interventions
```

Protected routes are intended to enforce role-based access.

---

## API Integration

API-related functionality is kept under:

```text
src/api/
```

Primary modules include:

```text
axiosClient.js
authApi.js
assessmentApi.js
```

This separation keeps UI components independent of the underlying HTTP implementation and makes backend integration easier to maintain.

---

## Authentication and Authorization

The application follows a role-based architecture:

```text
                    Authentication
                          │
             ┌────────────┼────────────┐
             │            │            │
         Candidate     Commander   Medical Officer
             │            │            │
        Candidate UI   Commander UI  Welfare UI
```

Authentication state is managed through:

```text
src/context/AuthContext.jsx
```

Reusable authentication logic is exposed through:

```text
src/hooks/useAuth.js
```

Protected pages use:

```text
src/components/common/ProtectedRoute.jsx
```

---

## Development Status

### Current

- [x] React/Vite frontend setup
- [x] Tailwind CSS integration
- [x] Application routing structure
- [x] Homepage
- [x] Authentication pages
- [x] Login and registration UI
- [x] Reusable component structure
- [x] Authentication context architecture
- [x] API layer structure
- [x] Role-based application architecture

### In Progress / Planned

- [ ] Complete authentication API integration
- [ ] Candidate assessment interface
- [ ] Video recording and submission flow
- [ ] Structured questionnaire
- [ ] Assessment result interface
- [ ] Candidate assessment history
- [ ] Candidate profile
- [ ] Commander personnel roster
- [ ] Commander welfare overview
- [ ] Medical officer triage dashboard
- [ ] Intervention management
- [ ] Final backend/frontend integration
- [ ] Production deployment

---

## Design Principles

### 1. Role-based experience
Each user role should have a focused interface containing only the tools required for that role.

### 2. Reusable components
Common UI elements are separated into reusable components to reduce duplication and simplify maintenance.

### 3. Responsive design
The interface is designed to work across desktop, tablet, and mobile screen sizes.

### 4. Separation of concerns
UI components, API communication, authentication state, hooks, and pages are kept in separate layers.

### 5. Privacy-conscious design
Because the platform deals with sensitive personnel welfare information, the frontend should avoid exposing confidential information unnecessarily and should rely on backend authorization for protected data.

---

## Contributing

When adding new functionality:

1. Create reusable components where appropriate.
2. Keep API calls inside the `src/api/` layer.
3. Use the existing authentication and routing architecture.
4. Never commit `.env` files or secrets.
5. Test the application locally before committing.
6. Run the linter before pushing major changes.

Typical workflow:

```bash
git pull
npm install
npm run dev
```

After making changes:

```bash
npm run lint
npm run build
git status
git add .
git commit -m "Describe your change"
git push
```

---

## Project Context

**Project:** Chitta Shanti  
**Domain:** Personnel welfare and stress monitoring  
**Target Users:** CAPFs / Armed Forces personnel and authorized officers  
**Frontend:** React + Vite  
**Backend:** FastAPI + MongoDB  
**Authentication:** JWT + role-based access control  

---

## License

This project is currently being developed as a prototype for the **Smart India Hackathon 2026**.

Add an appropriate license if the project is later released as an open-source project.
