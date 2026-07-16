import type { Todo, TodosByDate } from './types'

const STORAGE_KEY = 'daylist.todos.v1'

export function loadTodos(): TodosByDate {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as TodosByDate
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed
  } catch {
    return {}
  }
}

export function saveTodos(data: TodosByDate): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  }
}
