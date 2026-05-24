import type { HabitModel } from '@/generated/prisma/models'
import { HabitCard } from './habit-card'

type Props = {
  habits: HabitModel[]
  checkedIds: Set<string>
}

type ColumnVariant = 'green' | 'cyan'

function Column({
  title,
  habits,
  variant,
  checkedIds,
}: {
  title: string
  habits: HabitModel[]
  variant: ColumnVariant
  checkedIds: Set<string>
}) {
  const isGreen = variant === 'green'
  const headerColor = isGreen ? 'var(--green)' : 'var(--cyan)'
  const mutedColor  = isGreen ? 'var(--text-muted)' : '#1a4a5a'
  const borderClass = isGreen ? 'terminal-border' : 'terminal-border-cyan'

  return (
    <div className="flex-1 min-w-0">
      <h2
        className="text-2xl mb-3 pb-1"
        style={{
          fontFamily: "var(--font-terminal)",
          color: headerColor,
          borderBottom: `1px solid ${mutedColor}`,
        }}
      >
        [ {title} ]
      </h2>
      {habits.length === 0 ? (
        <p
          className={`text-sm py-4 text-center ${borderClass}`}
          style={{ color: mutedColor }}
        >
          -- EMPTY --
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} variant={variant} initialDone={checkedIds.has(habit.id)} />
          ))}
        </ul>
      )}
    </div>
  )
}

export function HabitList({ habits, checkedIds }: Props) {
  if (habits.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        習慣がまだありません。上のフォームから追加してみましょう！
      </p>
    )
  }

  const daily  = habits.filter((h) => h.frequency === 'DAILY')
  const weekly = habits.filter((h) => h.frequency === 'WEEKLY')

  return (
    <div className="flex gap-8">
      <Column title="DAILY"  habits={daily}  variant="green" checkedIds={checkedIds} />
      <Column title="WEEKLY" habits={weekly} variant="cyan"  checkedIds={checkedIds} />
    </div>
  )
}
