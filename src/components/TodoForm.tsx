import { useState, type FormEvent } from 'react'

type TodoFormProps = {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">
        Add a todo
      </label>
      <input
        id="todo-input"
        className="todo-form__input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What needs doing today?"
        autoComplete="off"
        maxLength={200}
      />
      <button type="submit" className="todo-form__submit" disabled={!value.trim()}>
        Add
      </button>
    </form>
  )
}
