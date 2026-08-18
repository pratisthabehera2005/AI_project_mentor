import axios from 'axios'
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
  mockAIResponse,
} from '../data/mockData'

// Base URL for the future FastAPI backend.
// Read from VITE_API_BASE_URL, defaulting to the local dev server.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Master switch: when true the app uses mock data and never calls the backend.
// Set VITE_USE_MOCK_DATA=false in .env once the Python backend is running.
const USE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA !== 'false'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Helper to simulate network latency for mock responses.
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// Project endpoints
// ---------------------------------------------------------------------------

export async function getProjects() {
  if (USE_MOCK_DATA) {
    await delay()
    return mockProjects
  }
  const res = await apiClient.get('/api/projects')
  return res.data
}

export async function getProjectById(projectId) {
  if (USE_MOCK_DATA) {
    await delay()
    return mockProjects.find((p) => p.id === Number(projectId)) || null
  }
  const res = await apiClient.get(`/api/projects/${projectId}`)
  return res.data
}

export async function createProject(projectData) {
  if (USE_MOCK_DATA) {
    await delay()
    return { ...projectData, id: Date.now() }
  }
  const res = await apiClient.post('/api/projects', projectData)
  return res.data
}

export async function updateProject(projectId, projectData) {
  if (USE_MOCK_DATA) {
    await delay()
    return { ...projectData, id: projectId }
  }
  const res = await apiClient.put(`/api/projects/${projectId}`, projectData)
  return res.data
}

export async function deleteProject(projectId) {
  if (USE_MOCK_DATA) {
    await delay()
    return { success: true }
  }
  const res = await apiClient.delete(`/api/projects/${projectId}`)
  return res.data
}

// ---------------------------------------------------------------------------
// Task endpoints
// ---------------------------------------------------------------------------

export async function getTasks() {
  if (USE_MOCK_DATA) {
    await delay()
    return mockTasks
  }
  const res = await apiClient.get('/api/tasks')
  return res.data
}

export async function createTask(taskData) {
  if (USE_MOCK_DATA) {
    await delay()
    return { ...taskData, id: Date.now() }
  }
  const res = await apiClient.post('/api/tasks', taskData)
  return res.data
}

export async function updateTask(taskId, taskData) {
  if (USE_MOCK_DATA) {
    await delay()
    return { ...taskData, id: taskId }
  }
  const res = await apiClient.put(`/api/tasks/${taskId}`, taskData)
  return res.data
}

export async function updateTaskStatus(taskId, status) {
  if (USE_MOCK_DATA) {
    await delay()
    return { id: taskId, status }
  }
  const res = await apiClient.patch(`/api/tasks/${taskId}/status`, { status })
  return res.data
}

export async function deleteTask(taskId) {
  if (USE_MOCK_DATA) {
    await delay()
    return { success: true }
  }
  const res = await apiClient.delete(`/api/tasks/${taskId}`)
  return res.data
}

// ---------------------------------------------------------------------------
// AI endpoints
// ---------------------------------------------------------------------------

export async function generateAIPlan(requestData) {
  if (USE_MOCK_DATA) {
    await delay(900)
    return mockAIResponse
  }
  const res = await apiClient.post('/api/ai/plan', requestData)
  return res.data
}

export async function getAIHistory(projectId) {
  if (USE_MOCK_DATA) {
    await delay()
    if (projectId) {
      return mockAIHistory.filter((h) => h.projectId === Number(projectId))
    }
    return mockAIHistory
  }
  const url = projectId
    ? `/api/ai/history/${projectId}`
    : '/api/ai/history'
  const res = await apiClient.get(url)
  return res.data
}

// ---------------------------------------------------------------------------
// Dashboard + health
// ---------------------------------------------------------------------------

export async function getDashboardStatistics() {
  if (USE_MOCK_DATA) {
    await delay()
    return null // computed client-side from mock data
  }
  const res = await apiClient.get('/api/dashboard')
  return res.data
}

export async function checkBackendHealth() {
  if (USE_MOCK_DATA) {
    await delay(200)
    return { status: 'mock' }
  }
  const res = await apiClient.get('/api/health')
  return res.data
}

export { USE_MOCK_DATA, BASE_URL }
