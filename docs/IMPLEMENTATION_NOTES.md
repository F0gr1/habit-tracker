# 実装解説: habit-tracker

このドキュメントは、今回の改善で何を変えたか、なぜその設計にしたか、次に自分で実装するときにどこを見ればよいかを整理したものです。

## 今回のゴール

元のアプリは、Next.js、Prisma、Server Actionsを使って習慣を追加・完了できる土台がありました。一方で、トップページが初期テンプレートのまま、所有者チェックが弱い、UIがモバイルで崩れやすい、テストしやすい純粋関数が少ない、という課題がありました。

今回の改善では、ポートフォリオとして「動く」だけでなく、設計意図が読めるアプリにすることを目指しました。

## 主な変更

- トップページをプロダクト紹介ページに差し替えました。
- `/habits` をダッシュボードらしいUIに改善しました。
- 今日の完了数、達成率、最大ストリーク、7日間の達成数を表示しました。
- Server ActionsにZod validationを追加しました。
- `dev-user` fallbackでも所有者チェックを通す設計にしました。
- 日付計算と入力検証を `src/lib/` に分離しました。
- `tsx + node:test` で純粋関数のテストを追加しました。
- `.env.example`、Node/npm要件、Prisma scriptsを追加しました。
- OpenSpecで今回の変更理由、設計、受け入れ条件を残しました。

## Server ComponentとClient Componentの分け方

`src/app/habits/page.tsx` はServer Componentです。DBから習慣とログを取得し、画面に渡すためのView Modelを作っています。

一方で、`HabitCard` と `AddHabitForm` はClient Componentです。理由は、クリック、フォーム送信、楽観更新、pending表示といったブラウザ側の状態を扱うからです。

大事なのは、DBアクセスをClient Componentに持ち込まないことです。DBを読む場所はServer Component、DBを書く場所はServer Actions、ユーザー操作を扱う場所はClient Componentに分けると、責務が追いやすくなります。

## なぜView Modelに変換するのか

Prismaから取得したデータをそのままClient Componentへ渡すと、DateやPrisma固有の型が混ざりやすくなります。

今回の実装では、`HabitCardData` という画面用の形に変換しています。

これにより、Client ComponentはDBモデルを知らなくてよくなります。カードは `name`、`frequency`、`todayDone`、`streakDays` など、表示に必要な値だけを受け取ります。

## Zod validationの役割

Server Actionsはサーバーで実行されますが、入力元はフォームやクライアントから来るため信用できません。

そのため、`addHabit` では `AddHabitInputSchema`、`toggleHabitLog` では `ToggleHabitInputSchema` を通しています。

この設計にすると、以下が安全になります。

- 空の習慣名を保存しない。
- 長すぎる値を受け付けない。
- 想定外のfrequencyをDBへ渡さない。
- 不正なhabitIdで処理を進めない。

## 所有者チェックの考え方

今は本格的な認証を入れていないため、`src/lib/current-user.ts` で `dev-user` を返しています。

ただし、Server Actionsでは必ず `userId` を条件に含めています。

```ts
const habit = await prisma.habit.findFirst({
  where: { id: parsed.data.habitId, userId },
  select: { id: true },
});
```

この形にしておくと、NextAuthを導入したときに `getCurrentUserId()` の中身をセッション取得に差し替えるだけで、DB更新側の安全設計をそのまま使えます。

「認証はあとで入れるから今は所有者チェックなし」ではなく、「認証前でも所有者チェックの入口を作る」のがポイントです。

## ストリーク計算を分離した理由

`src/lib/habit-stats.ts` は、今日の日付キー、直近7日、現在ストリークを計算します。

このロジックをUIに直接書くと、見た目の変更と日付計算の変更が混ざります。純粋関数として分けることで、Node.jsのテストだけで確認できます。

日付や集計はバグが出やすいので、UIより先に関数単位でテストできる状態にしておく価値があります。

## 次に自分で実装するなら

1. `src/lib/current-user.ts` をNextAuthのセッション取得に差し替える。
2. `Habit` に目標回数や色などの設定を追加する。
3. `src/lib/habit-stats.ts` に週次習慣専用の達成ロジックを追加する。
4. `HabitCard` に履歴表示や編集ボタンを追加する。
5. Playwrightで習慣追加と完了トグルのE2Eテストを追加する。
6. `openspec/changes/` に新しいchangeを作り、実装前に受け入れ条件を書く。

## 注意点

現時点ではNextAuth、tRPC、React Query、Zustandは依存にありますが、本実装では使っていません。

ポートフォリオでは、使っていない技術を「使っています」と見せるより、READMEに将来スコープとして明記する方が評価されやすいです。実装済みの範囲と未実装の範囲を正直に分けることが大事です。
