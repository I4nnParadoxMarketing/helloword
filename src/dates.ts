export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b)
}

export function formatDayLabel(date: Date, today: Date): string {
  if (isSameDay(date, today)) return 'Today'
  const yesterday = addDays(today, -1)
  if (isSameDay(date, yesterday)) return 'Yesterday'
  const tomorrow = addDays(today, 1)
  if (isSameDay(date, tomorrow)) return 'Tomorrow'
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
  })
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
