import { useMemo, useState } from 'react'
import { DateNav } from './components/DateNav'
import { DayProgress } from './components/DayProgress'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import {
  addDays,
  formatDayLabel,
  formatFullDate,
  isSameDay,
  toDateKey,
} from './dates'
import { useDailyTodos } from './hooks/useDailyTodos'

function App() {
  const today = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const [selectedDate, setSelectedDate] = useState(today)
  const dateKey = toDateKey(selectedDate)
  const previousKey = toDateKey(addDays(selectedDate, -1))

  const {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    clearCompleted,
    carryFromPrevious,
  } = useDailyTodos(dateKey)

  const completed = todos.filter((todo) => todo.completed).length
  const isToday = isSameDay(selectedDate, today)

  return (
    <div className="app">
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__wash" />
        <div className="atmosphere__glow" />
        <div className="atmosphere__grain" />
      </div>

      <main className="shell">
        <header className="hero">
          <p className="brand">Daylist</p>
          <h1 className="hero__title">Your day, one clear list.</h1>
          <p className="hero__subtitle">
            Plan what matters for each day and keep the rest for tomorrow.
          </p>
        </header>

        <section className="panel" aria-labelledby="day-heading">
          <h2 id="day-heading" className="sr-only">
            Todos for {formatFullDate(selectedDate)}
          </h2>

          <DateNav
            label={formatDayLabel(selectedDate, today)}
            fullDate={formatFullDate(selectedDate)}
            isToday={isToday}
            onPrev={() => setSelectedDate((d) => addDays(d, -1))}
            onNext={() => setSelectedDate((d) => addDays(d, 1))}
            onToday={() => setSelectedDate(today)}
          />

          <DayProgress completed={completed} total={todos.length} />

          <div className="composer composer--inline">
            <TodoForm onAdd={addTodo} />
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onRemove={removeTodo}
          />

          <div className="panel__actions">
            <button
              type="button"
              className="ghost-btn"
              onClick={() => carryFromPrevious(previousKey)}
            >
              <span className="ghost-btn__full">Bring unfinished from previous day</span>
              <span className="ghost-btn__short">Bring unfinished</span>
            </button>
            {completed > 0 && (
              <button type="button" className="ghost-btn" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        </section>
      </main>

      <div className="composer composer--sticky">
        <TodoForm onAdd={addTodo} id="todo-input-sticky" />
      </div>
    </div>
  )
}

export default App
