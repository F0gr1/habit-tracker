// チェックボックスのクリックイベントを扱うため Client Component
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleHabitLog } from "../_actions/habit-actions";
import type { HabitCardData } from "./habit-list";

type ColumnVariant = "green" | "cyan";

type Props = {
  habit: HabitCardData;
  variant: ColumnVariant;
};

export function HabitCard({ habit, variant }: Props) {
  const router = useRouter();
  const [done, setDone] = useState(habit.todayDone);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const nextDone = !done;
    setDone(nextDone);
    setError(null);

    startTransition(async () => {
      try {
        const result = await toggleHabitLog(habit.id);

        if (result?.ok === false) {
          setDone(!nextDone);
          setError(result.error);
          return;
        }

        router.refresh();
      } catch {
        setDone(!nextDone);
        setError("習慣の完了状態を更新できませんでした。もう一度お試しください。");
      }
    });
  }

  const activeColor = variant === "green" ? "var(--green)" : "var(--cyan)";
  const dimColor = variant === "green" ? "var(--green-dim)" : "var(--cyan-dim)";
  const mutedColor = variant === "green" ? "var(--text-muted)" : "#2e7080";
  const borderClass = variant === "green" ? "terminal-border" : "terminal-border-cyan";
  const completedDays = Math.max(
    0,
    habit.completionsInWindow + (done && !habit.todayDone ? 1 : 0) - (!done && habit.todayDone ? 1 : 0),
  );
  const progressWidth = `${Math.min(100, Math.round((completedDays / habit.windowDays) * 100))}%`;
  const streakDays = done ? Math.max(1, habit.streakDays + (habit.todayDone ? 0 : 1)) : 0;
  const statusLabel = done
    ? streakDays > 1
      ? `${streakDays} DAY STREAK`
      : "DONE TODAY"
    : habit.todayDone
      ? "OPEN TODAY"
      : habit.statusLabel;

  return (
    <li
      className={`p-3 ${borderClass} transition-all sm:p-4`}
      style={{ background: done ? (variant === "green" ? "var(--green-muted)" : "var(--cyan-muted)") : "transparent" }}
    >
      <button
        onClick={handleClick}
        disabled={isPending}
        className="w-full text-left disabled:cursor-wait disabled:opacity-70"
        aria-label={done ? "未完了に戻す" : "完了にする"}
        aria-pressed={done}
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex-shrink-0 text-sm"
            style={{ fontFamily: "var(--font-terminal)", color: activeColor, fontSize: "1.1rem" }}
          >
            {done ? "[DONE]" : "[    ]"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <p className="text-base leading-snug" style={{ color: done ? dimColor : activeColor }}>
                &gt; {habit.name}
              </p>
              <span className="text-xs tracking-[0.25em]" style={{ color: done ? activeColor : mutedColor }}>
                {isPending ? "SYNCING" : statusLabel}
              </span>
            </div>
            {habit.description && (
              <p className="mt-1 text-xs" style={{ color: mutedColor }}>
                {habit.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs" style={{ color: mutedColor }}>
          <span>
            TODAY <strong style={{ color: done ? activeColor : mutedColor }}>{done ? "YES" : "NO"}</strong>
          </span>
          <span>
            STREAK <strong style={{ color: activeColor }}>{streakDays}</strong>
          </span>
          <span>
            7D <strong style={{ color: activeColor }}>{completedDays}/{habit.windowDays}</strong>
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden bg-black/40">
          <div className="h-full transition-all" style={{ width: progressWidth, background: activeColor }} />
        </div>
      </button>

      {error && (
        <p className="mt-3 text-xs" style={{ color: "#ff6b6b" }}>
          ! {error}
        </p>
      )}
    </li>
  );
}
