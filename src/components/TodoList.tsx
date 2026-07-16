import type { Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onRemove: (id: string) => void
}

export function TodoList({ todos, onToggle, onEdit, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Nothing planned yet</p>
        <p className="empty-state__copy">
          Add the first thing you want to finish today.
        </p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
