// フォームの入力とバリデーションUIを扱うため Client Component
'use client'

import { useActionState } from 'react'
import { addHabit, type ActionResult } from '../_actions/habit-actions'

export function AddHabitForm() {
  const [state, action, isPending] = useActionState<ActionResult, FormData>(addHabit, undefined)

  return (
    <form action={action} className="mb-10">
      <p
        className="text-xs mb-2"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--text-muted)", fontSize: "0.55rem" }}
      >
        ▶ REGISTER NEW QUEST
      </p>

      <div className="pixel-input flex gap-0">
        <input
          name="name"
          placeholder="Quest name..."
          className="flex-1 px-4 py-3 bg-transparent outline-none text-sm placeholder:opacity-30"
          style={{ color: "var(--text)" }}
          required
        />
        <select
          name="frequency"
          defaultValue="DAILY"
          className="px-3 py-3 bg-transparent outline-none cursor-pointer text-xs"
          style={{
            color: "var(--gold)",
            borderLeft: "2px solid var(--text-muted)",
            fontFamily: "var(--font-pixel)",
            fontSize: "0.55rem",
          }}
        >
          <option value="DAILY"  style={{ background: "#060c16" }}>DAILY</option>
          <option value="WEEKLY" style={{ background: "#060c16" }}>WEEKLY</option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-3 text-xs disabled:opacity-40 transition-all"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "0.55rem",
            color: "var(--bg)",
            background: isPending ? "var(--gold-dim)" : "var(--gold)",
            borderLeft: "2px solid var(--text-muted)",
          }}
        >
          {isPending ? '...' : 'ADD'}
        </button>
      </div>

      {state?.error && (
        <p
          className="mt-2 text-xs"
          style={{ fontFamily: "var(--font-pixel)", color: "#f87171", fontSize: "0.55rem" }}
        >
          ✗ {state.error}
        </p>
      )}
    </form>
  )
}
