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
    <main className="max-w-5xl mx-auto py-10 px-6">
      <header className="mb-10">
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-pixel)" }}>
          ★ WELCOME BACK, HERO ★
        </p>
        <h1
          className="text-2xl leading-relaxed cursor"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--gold)" }}
        >
          QUEST LOG
        </h1>
        <div
          className="mt-4 h-0.5"
          style={{ background: "linear-gradient(to right, var(--gold-dim), transparent)" }}
        />
      </header>

      <AddHabitForm />
      <HabitList habits={habits} />
    </main>
  )
}
