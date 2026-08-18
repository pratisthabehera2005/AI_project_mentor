# AI Project Mentor

## Application objective

AI Project Mentor is a beginner-friendly full-stack training application that helps learners manage software projects and development tasks while getting AI-assisted guidance. Users can create projects, add and update tasks, track progress on a dashboard, and ask an AI mentor to break requirements into actionable development tasks.

## Technology stack (frontend)

- HTML5
- CSS3
- JavaScript ES6+
- React.js (functional components + hooks)
- Vite (build tool)
- React Router DOM (navigation)
- Axios (prepared for future backend API calls)

## Current frontend features

- Responsive sidebar + collapsible mobile navigation
- Dashboard with summary cards, project progress bars, recent tasks, and AI recommendation
- Projects page with create, edit, and delete (with confirmation dialog)
- Project details page with task list and progress bar
- Tasks page with filters (project, priority, status), search, inline status change, and CRUD
- AI Mentor page with structured mock response (Frontend / Backend / Database / Testing / Blockers / Next Action)
- AI History page with filters and full-response viewer
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge, Button
- Mock data for 3 projects, 10 tasks, and 4 AI interactions
- Form validation with inline error messages
- Blue / indigo / cyan / white theme

## Planned backend technologies

- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API (GPT-OSS model)

The AI API key and database credentials will live only in the Python backend.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/        Sidebar, Header, Layout shell
    Dashboard/     StatCard, ProjectProgressRow
    Projects/      ProjectForm
    Tasks/         TaskForm
    AI/            (future AI-specific components)
    Common/        LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge, Button
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  services/
    api.js         Axios service with mock-data switch
  data/
    mockData.js    Centralised mock data
    AppDataContext.jsx  Global state via React Context
  styles/
    global.css     Theme, layout, components, responsive rules
  App.jsx          Routes
  main.jsx         Entry point
```

## Environment variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_USE_MOCK_DATA=true
```

- `VITE_API_BASE_URL` - base URL of the future FastAPI backend.
- `VITE_USE_MOCK_DATA` - when `true` (default) the app uses mock data. Set to `false` once the Python backend is running to enable real API calls.

No AI or database credentials are stored in the frontend.

## Future FastAPI integration plan

The service layer (`src/services/api.js`) already exposes functions matching the planned endpoints:

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/projects`, `POST /api/projects`
- `GET /api/projects/{id}`, `PUT /api/projects/{id}`, `DELETE /api/projects/{id}`
- `GET /api/tasks`, `POST /api/tasks`
- `GET /api/tasks/{id}`, `PUT /api/tasks/{id}`
- `PATCH /api/tasks/{id}/status`, `DELETE /api/tasks/{id}`
- `POST /api/ai/plan`, `POST /api/ai/next-task`
- `GET /api/ai/history/{project_id}`

To connect the backend: set `VITE_USE_MOCK_DATA=false` and ensure the FastAPI server runs at `VITE_API_BASE_URL`. The existing UI components already handle loading, error, and success states for real API responses.
