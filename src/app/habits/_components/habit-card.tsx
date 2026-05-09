// チェックボックスのクリックイベントを扱うため Client Component
'use client'

import { useState } from 'react'
import type { HabitModel } from '@/generated/prisma/models'

type ColumnVariant = 'green' | 'cyan'

type Props = {
  habit: HabitModel
  variant: ColumnVariant
}

export function HabitCard({ habit, variant }: Props) {
  const [done, setDone] = useState(false)

  const activeColor  = variant === 'green' ? 'var(--green)'     : 'var(--cyan)'
  const dimColor     = variant === 'green' ? 'var(--green-dim)'  : 'var(--cyan-dim)'
  const mutedColor   = variant === 'green' ? 'var(--text-muted)' : '#1a4a5a'
  const borderClass  = variant === 'green' ? 'terminal-border'   : 'terminal-border-cyan'

  return (
    <li
      className={`p-3 ${borderClass} transition-all`}
      style={{ background: done ? (variant === 'green' ? 'var(--green-muted)' : 'var(--cyan-muted)') : 'transparent' }}
    >
      <button
        onClick={() => setDone(!done)}
        className="w-full text-left flex items-start gap-3"
        aria-label={done ? '未完了に戻す' : '完了にする'}
      >
        <span
          className="text-sm flex-shrink-0 mt-0.5"
          style={{ fontFamily: "var(--font-terminal)", color: activeColor, fontSize: '1.1rem' }}
        >
          {done ? '[DONE]' : '[    ]'}
        </span>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm leading-snug"
            style={{ color: done ? dimColor : activeColor }}
          >
            &gt; {habit.name}
          </p>
          {habit.description && (
            <p className="text-xs mt-0.5" style={{ color: mutedColor }}>
              {habit.description}
            </p>
          )}
        </div>
      </button>
    </li>
  )
}
