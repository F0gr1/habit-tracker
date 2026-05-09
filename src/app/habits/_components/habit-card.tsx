// チェックボックスのクリックイベントを扱うため Client Component
'use client'

import { useState } from 'react'
import type { HabitModel } from '@/generated/prisma/models'

type Props = {
  habit: HabitModel
}

export function HabitCard({ habit }: Props) {
  const [done, setDone] = useState(false)

  return (
    <li className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
      <button
        onClick={() => setDone(!done)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-colors ${
          done ? 'border-blue-500' : 'border-gray-300'
        }`}
        style={done ? { backgroundColor: habit.color, borderColor: habit.color } : {}}
        aria-label={done ? '未完了に戻す' : '完了にする'}
      />
      <div className="flex-1">
        <p className={`font-medium ${done ? 'line-through text-gray-400' : ''}`}>
          {habit.name}
        </p>
        {habit.description && (
          <p className="text-sm text-gray-500">{habit.description}</p>
        )}
      </div>
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: habit.color }}
      />
    </li>
  )
}
