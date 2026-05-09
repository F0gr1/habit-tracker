import { prisma } from '@/lib/prisma'
import { HabitList } from './_components/habit-list'
import { AddHabitForm } from './_components/add-habit-form'

// TODO: 認証実装後は session.user.id に差し替える
const DEV_USER_ID = 'dev-user'

export default async function HabitsPage() {
  const habits = await prisma.habit.findMany({
    where: { userId: DEV_USER_ID },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">習慣トラッカー</h1>
      <AddHabitForm />
      <HabitList habits={habits} />
    </main>
  )
}
