import { prisma } from '@/lib/prisma'
import { HabitList } from './_components/habit-list'
import { AddHabitForm } from './_components/add-habit-form'

// TODO: 認証実装後は session.user.id に差し替える
const DEV_USER_ID = 'dev-user'

export default async function HabitsPage() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [habits ,logs] = await Promise.all([
        prisma.habit.findMany({ where: {userId: DEV_USER_ID}, orderBy: { createdAt: 'asc' }}),
        prisma.habitLog.findMany({ where: { date: today }})
    ])

    const checkedIds = new Set(logs.map(log => log.habitId))
  return (  
    <main className="max-w-6xl mx-auto py-10 px-8">
      <header className="mb-8">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          SYSTEM BOOT... OK
        </p>
        <h1
          className="text-4xl mt-1 cursor"
          style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}
        >
          &gt; HABIT TRACKER v1.0
        </h1>
        <div className="mt-2 h-px" style={{ background: "var(--green-muted)" }} />
      </header>
      <AddHabitForm />
      <HabitList habits={habits} checkedIds={checkedIds} />
    </main>
  )
}
