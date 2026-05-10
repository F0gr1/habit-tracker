import type { HabitModel } from '@/generated/prisma/models'
import { HabitCard } from './habit-card'

type ColumnVariant = 'green' | 'blue'

function Column({
  title,
  label,
  habits,
  variant,
}: {
  title: string
  label: string
  habits: HabitModel[]
  variant: ColumnVariant
}) {
  const color      = variant === 'green' ? 'var(--green)'      : 'var(--blue)'
  const mutedColor = variant === 'green' ? 'var(--green-dim)'  : 'var(--blue-dim)'
  const boxClass   = variant === 'green' ? 'pixel-box-green'   : 'pixel-box-blue'

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-4">
        <p className="text-xs mb-1" style={{ fontFamily: "var(--font-pixel)", color: mutedColor }}>
          {label}
        </p>
        <h2 className="text-base" style={{ fontFamily: "var(--font-pixel)", color }}>
          {title}
        </h2>
      </div>

      {habits.length === 0 ? (
        <div
          className={`${boxClass} p-4 text-center text-xs`}
          style={{ color: mutedColor, fontFamily: "var(--font-pixel)" }}
        >
          -- NO QUESTS --
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} variant={variant} />
          ))}
        </ul>
      )}
    </div>
  )
}

export function HabitList({ habits }: { habits: HabitModel[] }) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-xs py-12" style={{ color: "var(--text-muted)", fontFamily: "var(--font-pixel)" }}>
        ★ NO QUESTS REGISTERED ★
      </p>
    )
  }

  const daily  = habits.filter((h) => h.frequency === 'DAILY')
  const weekly = habits.filter((h) => h.frequency === 'WEEKLY')

  return (
    <div className="flex gap-8">
      <Column title="DAILY QUESTS"  label="◆ EVERY DAY"  habits={daily}  variant="green" />
      <Column title="WEEKLY QUESTS" label="◆ EVERY WEEK" habits={weekly} variant="blue"  />
    </div>
  )
}
