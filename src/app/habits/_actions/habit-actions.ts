'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const AddHabitSchema = z.object({
  name: z.string().min(1, '習慣名を入力してください').max(50, '50文字以内で入力してください'),
  frequency: z.enum(['DAILY', 'WEEKLY']),
})

// TODO: 認証実装後は session.user.id に差し替える
const DEV_USER_ID = 'dev-user'

export type ActionResult = { error: string } | undefined

export async function addHabit(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = AddHabitSchema.safeParse({
    name: formData.get('name'),
    frequency: formData.get('frequency'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '入力が正しくありません' }
  }

  await prisma.habit.create({
    data: {
      name: parsed.data.name,
      frequency: parsed.data.frequency,
      // connectOrCreate でデフォルトの開発用ユーザーを自動生成する
      user: {
        connectOrCreate: {
          where: { id: DEV_USER_ID },
          create: { id: DEV_USER_ID, email: 'dev@example.com' },
        },
      },
    },
  })
  revalidatePath('/habits')
}

export async function toggleHabitLog(habitId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existing = await prisma.habitLog.findFirst({
    where: {
      habitId,
      date: today,
    },
  })

  if (existing) {
    await prisma.habitLog.delete({
      where: { id: existing.id },
    })
  } else {
    await prisma.habitLog.create({
      data: {
        habitId,
        date: today,
      },
    })
  }
  revalidatePath('/habits')
}