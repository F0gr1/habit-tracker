// チェックボックスのクリックイベントを扱うため Client Component
'use client'

import { useState } from 'react'
import type { HabitModel } from '@/generated/prisma/models'

type ColumnVariant = 'green' | 'blue'

type Props = {
  habit: HabitModel
  variant: ColumnVariant
}

export function HabitCard({ habit, variant }: Props) {
  const [done, setDone] = useState(false)

  const color    = variant === 'green' ? 'var(--green)'     : 'var(--blue)'
  const dimColor = variant === 'green' ? 'var(--green-dim)' : 'var(--blue-dim)'
  const boxClass = variant === 'green' ? 'pixel-box-green'  : 'pixel-box-blue'

  return (
    <li className={`${boxClass} transition-all`}>
      <button
        onClick={() => setDone(!done)}
        className="w-full text-left p-3 flex items-start gap-3"
        aria-label={done ? '未完了に戻す' : '完了にする'}
      >
        {/* チェックマーク */}
        <span
          className="flex-shrink-0 text-lg leading-none mt-0.5"
          style={{ color: done ? 'var(--gold)' : dimColor }}
        >
          {done ? '★' : '☆'}
        </span>

        <div className="flex-1 min-w-0">
          {/* 習慣名 */}
          <p
            className="text-sm leading-snug"
            style={{ color: done ? 'var(--text-muted)' : color }}
          >
            {done && <span style={{ color: 'var(--gold)' }}>✓ </span>}
            {habit.name}
          </p>

          {/* 説明 */}
          {habit.description && (
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {habit.description}
            </p>
          )}

          {/* 完了時の EXP テキスト */}
          {done && (
            <p
              className="text-xs mt-1"
              style={{ fontFamily: "var(--font-pixel)", color: 'var(--gold)', fontSize: '0.55rem' }}
            >
              + EXP GAINED!
            </p>
          )}
        </div>

        {/* ステータス */}
        <span
          className="flex-shrink-0 text-xs"
          style={{
            fontFamily: "var(--font-pixel)",
            color: done ? 'var(--gold)' : dimColor,
            fontSize: '0.5rem',
          }}
        >
          {done ? 'DONE' : 'TODO'}
        </span>
      </button>
    </li>
  )
}
