import Link from "next/link";

import { getCurrentUserId } from "@/lib/current-user";
import { addDays, getHabitProgress, getHabitStatusLabel, getStartOfLocalDay } from "@/lib/habit-stats";
import { prisma } from "@/lib/prisma";
import { AddHabitForm } from "./_components/add-habit-form";
import { HabitList, type HabitCardData } from "./_components/habit-list";

export const dynamic = "force-dynamic";

const PROGRESS_WINDOW_DAYS = 7;

export default async function HabitsPage() {
  const userId = getCurrentUserId();
  const today = getStartOfLocalDay();
  const windowStart = addDays(today, -(PROGRESS_WINDOW_DAYS - 1));

  const habits = await prisma.habit.findMany({
    where: { userId },
    orderBy: [{ frequency: "asc" }, { createdAt: "asc" }],
    include: {
      logs: {
        where: {
          date: {
            gte: windowStart,
            lte: today,
          },
        },
        select: { date: true },
      },
    },
  });

  const habitCards: HabitCardData[] = habits.map((habit) => {
    const progress = getHabitProgress(
      habit.logs.map((log) => log.date),
      today,
      PROGRESS_WINDOW_DAYS,
    );

    return {
      id: habit.id,
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      todayDone: progress.todayDone,
      streakDays: progress.streakDays,
      completionsInWindow: progress.completionsInWindow,
      windowDays: progress.windowDays,
      statusLabel: getHabitStatusLabel(progress),
    };
  });

  const completedToday = habitCards.filter((habit) => habit.todayDone).length;
  const maxStreak = habitCards.reduce((max, habit) => Math.max(max, habit.streakDays), 0);
  const completionRate = habitCards.length === 0 ? 0 : Math.round((completedToday / habitCards.length) * 100);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <header className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.35em]" style={{ color: "var(--text-muted)" }}>
            SYSTEM BOOT... OK
          </p>
          <Link className="text-xs underline-offset-4 hover:underline" href="/" style={{ color: "var(--green-dim)" }}>
            HOME
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <h1 className="cursor text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
              &gt; HABIT TRACKER v1.0
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6" style={{ color: "var(--text-muted)" }}>
              A compact dashboard for turning small routines into visible progress. The current build uses a
              development user fallback, but every query and mutation is still scoped through that owner id.
            </p>
          </div>

          <div className="terminal-border grid grid-cols-3 divide-x divide-[var(--border)] bg-black/20 text-center">
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                TODAY
              </p>
              <p className="text-2xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
                {completedToday}/{habitCards.length}
              </p>
            </div>
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                RATE
              </p>
              <p className="text-2xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
                {completionRate}%
              </p>
            </div>
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                STREAK
              </p>
              <p className="text-2xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
                {maxStreak}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 h-px" style={{ background: "var(--green-muted)" }} />
      </header>

      <AddHabitForm />
      <HabitList habits={habitCards} />
    </main>
  );
}
