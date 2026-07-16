type DayProgressProps = {
  completed: number
  total: number
}

export function DayProgress({ completed, total }: DayProgressProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="day-progress" aria-label={`${completed} of ${total} complete`}>
      <div className="day-progress__meta">
        <span>
          {completed}/{total} done
        </span>
        <span>{percent}%</span>
      </div>
      <div className="day-progress__track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="day-progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
