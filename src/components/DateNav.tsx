type DateNavProps = {
  label: string
  fullDate: string
  isToday: boolean
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export function DateNav({
  label,
  fullDate,
  isToday,
  onPrev,
  onNext,
  onToday,
}: DateNavProps) {
  return (
    <div className="date-nav">
      <button
        type="button"
        className="icon-btn"
        onClick={onPrev}
        aria-label="Previous day"
      >
        <ChevronLeft />
      </button>

      <div className="date-nav__center">
        <p className="date-nav__label">{label}</p>
        <p className="date-nav__full">{fullDate}</p>
        {!isToday && (
          <button type="button" className="text-btn" onClick={onToday}>
            Jump to today
          </button>
        )}
      </div>

      <button
        type="button"
        className="icon-btn"
        onClick={onNext}
        aria-label="Next day"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
