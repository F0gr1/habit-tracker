// フォームの入力とバリデーションUIを扱うため Client Component
"use client";

import { useActionState } from "react";
import { addHabit, type ActionResult } from "../_actions/habit-actions";

export function AddHabitForm() {
  const [state, action, isPending] = useActionState<ActionResult, FormData>(addHabit, undefined);

  return (
    <form action={action} className="mb-8 terminal-border bg-black/20 p-3 sm:p-4">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.35em]" style={{ color: "var(--text-muted)" }}>
            QUICK ADD
          </p>
          <h2 className="text-2xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
            Log a new quest
          </h2>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Daily and weekly habits share the same ownership and validation path.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_11rem_auto]" style={{ fontFamily: "var(--font-terminal)" }}>
        <input
          name="name"
          placeholder="NEW QUEST..."
          className="terminal-border min-h-12 bg-transparent px-3 py-2 text-lg outline-none placeholder:opacity-30 focus:shadow-[0_0_18px_rgba(0,255,65,0.18)]"
          style={{ color: "var(--green)" }}
          required
        />
        <select
          name="frequency"
          defaultValue="DAILY"
          className="terminal-border min-h-12 cursor-pointer bg-transparent px-3 py-2 text-lg outline-none"
          style={{ color: "var(--green)" }}
        >
          <option value="DAILY" style={{ background: "#060d06" }}>
            DAILY
          </option>
          <option value="WEEKLY" style={{ background: "#060d06" }}>
            WEEKLY
          </option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="min-h-12 px-5 py-2 text-lg transition-colors disabled:opacity-40"
          style={{
            color: "var(--bg)",
            background: isPending ? "var(--green-dim)" : "var(--green)",
            fontFamily: "var(--font-terminal)",
          }}
        >
          {isPending ? "SAVING" : "ADD_"}
        </button>
      </div>

      {state?.ok === false && (
        <p className="mt-3 text-sm" style={{ color: "#ff6b6b" }}>
          ! {state.error}
        </p>
      )}
      {state?.ok === true && state.message && (
        <p className="mt-3 text-sm" style={{ color: "var(--green-dim)" }}>
          &gt; {state.message}
        </p>
      )}
    </form>
  );
}
