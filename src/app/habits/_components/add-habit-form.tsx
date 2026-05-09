// フォームの入力とバリデーションUIを扱うため Client Component
'use client'

import { useActionState } from 'react'
import { addHabit, type ActionResult } from '../_actions/habit-actions'

export function AddHabitForm() {
  const [state, action, isPending] = useActionState<ActionResult, FormData>(addHabit, undefined)

  return (
    <form action={action} className="mb-8">
      <div className="flex gap-2">
        <input
          name="name"
          placeholder="新しい習慣を入力..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {isPending ? '追加中...' : '追加'}
        </button>
      </div>
      {state?.error && (
        <p className="mt-2 text-sm text-red-500">{state.error}</p>
      )}
    </form>
  )
}
