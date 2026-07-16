import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
  index: number
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, index, onToggle, onEdit, onRemove }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commitEdit = () => {
    onEdit(todo.id, draft)
    setEditing(false)
  }

  const cancelEdit = () => {
    setDraft(todo.text)
    setEditing(false)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    commitEdit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      cancelEdit()
    }
  }

  return (
    <li
      className={`todo-item${todo.completed ? ' is-done' : ''}`}
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <button
        type="button"
        className="todo-item__check"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        aria-pressed={todo.completed}
      >
        <span className="todo-item__check-mark" aria-hidden="true">
          {todo.completed ? '✓' : ''}
        </span>
      </button>

      {editing ? (
        <form className="todo-item__edit" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            maxLength={200}
            aria-label="Edit todo"
          />
        </form>
      ) : (
        <button
          type="button"
          className="todo-item__text"
          onClick={() => setEditing(true)}
        >
          {todo.text}
        </button>
      )}

      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onRemove(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        ×
      </button>
    </li>
  )
}
