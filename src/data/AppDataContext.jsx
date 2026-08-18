import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { mockProjects, mockTasks, mockAIHistory } from '../data/mockData'

// AppDataContext holds all projects, tasks, and AI history in local state.
// Pages read from and mutate this context so CRUD operations reflect
// instantly across the app while running on mock data.
const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [aiHistory, setAiHistory] = useState(mockAIHistory)
  const [loading, setLoading] = useState(false)

  // Simulate an initial load so the loading state is exercised.
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  // ---- Project helpers ----
  const addProject = useCallback((data) => {
    const newProject = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      techStack: data.techStack,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }, [])

  const updateProject = useCallback((id, data) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...data, techStack: data.techStack }
          : p
      )
    )
  }, [])

  const removeProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setTasks((prev) => prev.filter((t) => t.projectId !== id))
  }, [])

  // ---- Task helpers ----
  const addTask = useCallback((data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      projectId: Number(data.projectId),
      description: data.description,
      priority: data.priority,
      status: data.status,
      aiGenerated: data.aiGenerated,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [])

  const updateTask = useCallback((id, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...data,
              projectId: Number(data.projectId ?? t.projectId),
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : t
      )
    )
  }, [])

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : t
      )
    )
  }, [])

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ---- AI history helpers ----
  const addAIHistory = useCallback((entry) => {
    setAiHistory((prev) => [
      {
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
        ...entry,
      },
      ...prev,
    ])
  }, [])

  const removeAIHistory = useCallback((id) => {
    setAiHistory((prev) => prev.filter((h) => h.id !== id))
  }, [])

  // ---- Derived helpers ----
  const tasksForProject = useCallback(
    (projectId) => tasks.filter((t) => t.projectId === Number(projectId)),
    [tasks]
  )

  const projectById = useCallback(
    (id) => projects.find((p) => p.id === Number(id)),
    [projects]
  )

  const value = {
    projects,
    tasks,
    aiHistory,
    loading,
    addProject,
    updateProject,
    removeProject,
    addTask,
    updateTask,
    updateTaskStatus,
    removeTask,
    addAIHistory,
    removeAIHistory,
    tasksForProject,
    projectById,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
