import { useEffect, useState } from 'react'
import { createTodo, loadTodos, saveTodos } from '../storage'
import type { Todo, TodosByDate } from '../types'

export function useDailyTodos(dateKey: string) {
  const [byDate, setByDate] = useState<TodosByDate>(() => loadTodos())

  useEffect(() => {
    saveTodos(byDate)
  }, [byDate])

  const todos = byDate[dateKey] ?? []

  const updateDay = (updater: (current: Todo[]) => Todo[]) => {
    setByDate((prev) => {
      const current = prev[dateKey] ?? []
      const next = updater(current)
      if (next.length === 0) {
        const { [dateKey]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [dateKey]: next }
    })
  }

  const addTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    updateDay((current) => [...current, createTodo(trimmed)])
  }

  const toggleTodo = (id: string) => {
    updateDay((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) {
      removeTodo(id)
      return
    }
    updateDay((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
    )
  }

  const removeTodo = (id: string) => {
    updateDay((current) => current.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    updateDay((current) => current.filter((todo) => !todo.completed))
  }

  const carryFromPrevious = (previousKey: string) => {
    const previous = byDate[previousKey] ?? []
    const unfinished = previous.filter((todo) => !todo.completed)
    if (unfinished.length === 0) return 0

    updateDay((current) => {
      const existing = new Set(current.map((t) => t.text.toLowerCase()))
      const incoming = unfinished
        .filter((todo) => !existing.has(todo.text.toLowerCase()))
        .map((todo) => createTodo(todo.text))
      return [...current, ...incoming]
    })

    return unfinished.length
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    clearCompleted,
    carryFromPrevious,
  }
}
