import type { HabitModel } from '@/generated/prisma/models'
import { HabitCard } from './habit-card'

type Props = {
  habits: HabitModel[]
}

export function HabitList({ habits }: Props) {
  if (habits.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        習慣がまだありません。上のフォームから追加してみましょう！
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </ul>
  )
}
