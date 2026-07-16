import { useState, type FormEvent } from 'react'

type TodoFormProps = {
  onAdd: (text: string) => void
  id?: string
}

export function TodoForm({ onAdd, id = 'todo-input' }: TodoFormProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={id}>
        Add a todo
      </label>
      <input
        id={id}
        className="todo-form__input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What needs doing today?"
        autoComplete="off"
        enterKeyHint="done"
        maxLength={200}
      />
      <button type="submit" className="todo-form__submit" disabled={!value.trim()}>
        Add
      </button>
    </form>
  )
}
