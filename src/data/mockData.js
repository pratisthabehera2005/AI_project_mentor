// Centralised mock data for the AI Project Mentor frontend.
// When the Python/FastAPI backend is ready, the service layer
// (src/services/api.js) can replace these arrays with real API calls.

export const mockProjects = [
  {
    id: 1,
    name: 'Student Placement Portal',
    description:
      'A portal where students can register, upload their resumes, and apply for campus placement drives. Admins can manage companies and shortlist candidates.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-04',
  },
  {
    id: 2,
    name: 'Hospital Appointment System',
    description:
      'A booking system that lets patients schedule appointments with doctors, receive reminders, and view their visit history online.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-18',
  },
  {
    id: 3,
    name: 'AI Resume Mentor',
    description:
      'An AI-powered application that reviews student resumes, suggests improvements, and generates tailored interview preparation questions.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-02',
  },
]

export const mockTasks = [
  {
    id: 1,
    title: 'Design login and signup screens',
    projectId: 1,
    description: 'Create responsive authentication forms with validation and error states.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-10',
  },
  {
    id: 2,
    title: 'Build student profile page',
    projectId: 1,
    description: 'Display student personal details, academic record, and uploaded resume link.',
    priority: 'Medium',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-06',
    updatedAt: '2026-08-12',
  },
  {
    id: 3,
    title: 'Implement company registration API',
    projectId: 1,
    description: 'FastAPI endpoint for companies to register for a placement drive.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-08',
    updatedAt: '2026-08-14',
  },
  {
    id: 4,
    title: 'Create resume upload feature',
    projectId: 1,
    description: 'Allow students to upload PDF resumes with size and type validation.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-09',
    updatedAt: '2026-08-15',
  },
  {
    id: 5,
    title: 'Design appointment booking form',
    projectId: 2,
    description: 'Form for patients to pick a doctor, date, and time slot for an appointment.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-20',
    updatedAt: '2026-08-11',
  },
  {
    id: 6,
    title: 'Build doctor availability calendar',
    projectId: 2,
    description: 'Calendar component showing available and booked slots for each doctor.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-08-13',
  },
  {
    id: 7,
    title: 'Send appointment reminders',
    projectId: 2,
    description: 'Email and SMS reminders to patients before their scheduled appointment.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-25',
    updatedAt: '2026-08-16',
  },
  {
    id: 8,
    title: 'Resume parsing service',
    projectId: 3,
    description: 'Extract skills, experience, and education from uploaded resume documents.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-08-03',
    updatedAt: '2026-08-15',
  },
  {
    id: 9,
    title: 'AI feedback generation',
    projectId: 3,
    description: 'Use the GPT-OSS model to generate improvement suggestions for each resume section.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-16',
  },
  {
    id: 10,
    title: 'Interview question bank',
    projectId: 3,
    description: 'Curate role-based interview questions and display them on the dashboard.',
    priority: 'Medium',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-08-06',
    updatedAt: '2026-08-14',
  },
]

export const mockAIHistory = [
  {
    id: 1,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'I need a module where students can apply to multiple companies in a single placement drive.',
    responsePreview:
      'Frontend: build an application list view and a multi-select company picker. Backend: create an application endpoint that validates eligibility. Database: add an applications table linking students, companies, and drives.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-10',
  },
  {
    id: 2,
    projectId: 2,
    projectName: 'Hospital Appointment System',
    taskType: 'Identify Project Blockers',
    userPrompt:
      'What could go wrong if two patients book the same slot at the same time?',
    responsePreview:
      'Race condition risk on shared slots. Mitigate with database-level row locking and a unique constraint on (doctor_id, slot). Add a retry queue for failed bookings.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-12',
  },
  {
    id: 3,
    projectId: 3,
    projectName: 'AI Resume Mentor',
    taskType: 'Explain Implementation',
    userPrompt: 'How should I structure the resume parsing pipeline?',
    responsePreview:
      'Use a background worker: upload -> queue -> parser -> structured JSON -> AI feedback. Keep parsing async so the UI stays responsive. Store parsed JSON in SQL Server.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-14',
  },
  {
    id: 4,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Generate Project Plan',
    userPrompt: 'Give me a high-level plan to build the placement portal in 6 weeks.',
    responsePreview:
      'Week 1-2: auth and profile. Week 3: company and drive management. Week 4: application flow. Week 5: admin dashboard. Week 6: testing and deployment.',
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-16',
  },
]

// A structured mock response returned by the AI Mentor page.
export const mockAIResponse = {
  requirementUnderstanding:
    'The requirement asks for a feature that lets users perform the requested action safely, with clear validation and feedback at every step.',
  frontendTasks: [
    'Build a responsive form with labelled inputs and validation messages.',
    'Show loading and success states after submission.',
    'Display a list of created records with edit and delete actions.',
  ],
  backendTasks: [
    'Create a REST endpoint to accept and validate the payload.',
    'Store records in the database with timestamps.',
    'Return standardised error messages for invalid input.',
  ],
  databaseTasks: [
    'Design a table with unique id, created_at, and updated_at columns.',
    'Add indexes on frequently filtered columns.',
    'Enforce foreign-key constraints to related tables.',
  ],
  testingSteps: [
    'Write unit tests for form validation.',
    'Write API tests for success and error cases.',
    'Perform manual end-to-end testing in the browser.',
  ],
  possibleBlockers: [
    'Backend endpoint not yet available - use mock data meanwhile.',
    'Authentication flow may change how user identity is attached to records.',
  ],
  recommendedNextAction:
    'Start with the frontend form and connect it to mock data. Once the FastAPI endpoint is ready, swap the mock call for the real API function in src/services/api.js.',
}
