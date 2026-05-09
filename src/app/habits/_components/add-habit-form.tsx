// フォームの入力とバリデーションUIを扱うため Client Component
'use client'

import { useActionState } from 'react'
import { addHabit, type ActionResult } from '../_actions/habit-actions'

export function AddHabitForm() {
  const [state, action, isPending] = useActionState<ActionResult, FormData>(addHabit, undefined)

  return (
    <form action={action} className="mb-8">
      <div
        className="flex gap-0 terminal-border"
        style={{ fontFamily: "var(--font-terminal)" }}
      >
        <span
          className="px-3 py-2 text-lg flex-shrink-0 select-none"
          style={{ color: "var(--green-dim)", borderRight: "1px solid var(--border)" }}
        >
          &gt;
        </span>
        <input
          name="name"
          placeholder="NEW QUEST..."
          className="flex-1 px-3 py-2 text-lg bg-transparent outline-none placeholder:opacity-30"
          style={{ color: "var(--green)" }}
          required
        />
        <select
          name="frequency"
          defaultValue="DAILY"
          className="px-3 py-2 text-lg bg-transparent outline-none cursor-pointer"
          style={{
            color: "var(--green)",
            borderLeft: "1px solid var(--border)",
          }}
        >
          <option value="DAILY"  style={{ background: "#060d06" }}>DAILY</option>
          <option value="WEEKLY" style={{ background: "#060d06" }}>WEEKLY</option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-lg disabled:opacity-40 transition-colors"
          style={{
            color: "var(--bg)",
            background: isPending ? "var(--green-dim)" : "var(--green)",
            borderLeft: "1px solid var(--border)",
            fontFamily: "var(--font-terminal)",
          }}
        >
          {isPending ? 'LOADING' : 'ADD_'}
        </button>
      </div>
      {state?.error && (
        <p className="mt-2 text-sm" style={{ color: "#ff4444" }}>
          ! {state.error}
        </p>
      )}
    </form>
  )
}
