# Habit Tracker

RPG風の習慣トラッカーです。小さな習慣を「クエスト」として登録し、今日の完了状態、7日間の達成数、現在のストリークを見える化します。ポートフォリオで読まれることを意識して、UI、Server Actions、Prisma、バリデーション、ドキュメントのつながりが追いやすい構成にしています。

## 技術スタック

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- Prisma 7 + PostgreSQL
- Zod
- tsx + Node.js built-in test runner

## セットアップ

1. 依存関係をインストールします。

```bash
npm install
```

2. 環境変数を作成します。

```bash
cp .env.example .env
```

3. ローカルDBを起動します。

```bash
docker compose up -d
```

4. Prisma Clientを生成し、DBにスキーマを反映します。

```bash
npm run prisma:generate
npm run prisma:push
```

5. 開発サーバーを起動します。

```bash
npm run dev
```

アプリは `http://localhost:3000`、習慣ダッシュボードは `http://localhost:3000/habits` で確認できます。

## よく使うコマンド

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npm run prisma:studio
```

## アーキテクチャ

- `src/app/page.tsx`: プロダクト価値を説明するランディングページ。
- `src/app/habits/page.tsx`: DBから習慣と直近ログを取得するServer Component。`force-dynamic` を指定し、ビルド時にDBを読みに行かない設計にしています。
- `src/app/habits/_components/*`: フォーム、リスト、カードのUI。カードだけはクリック状態を扱うためClient Componentです。
- `src/app/habits/_actions/habit-actions.ts`: 習慣追加と完了トグルのServer Actions。Zodで入力を検証し、開発用ユーザーでも所有者チェックを通します。
- `src/lib/habit-validation.ts`: Server Actionsから切り出した純粋な入力検証。
- `src/lib/habit-stats.ts`: 日付キー、7日間の達成数、現在ストリークを計算する純粋関数。
- `src/lib/current-user.ts`: 認証実装前の `dev-user` フォールバックを一箇所に集約。
- `src/lib/prisma.ts`: Prisma Clientの共有インスタンス。

## Prisma / DBフロー

このアプリのデータは `User -> Habit -> HabitLog` の順で所有されます。

- `User`: NextAuth導入を見越したユーザーモデル。現時点では `dev-user` を開発用ユーザーとして使います。
- `Habit`: 習慣本体。`frequency` は `DAILY` または `WEEKLY`。
- `HabitLog`: ある習慣を特定の日付に完了した記録。`@@unique([habitId, date])` により、同じ習慣を同じ日に重複記録しないようにしています。

開発中にスキーマを変えたら、まず `prisma/schema.prisma` を編集し、次に以下を実行します。

```bash
npm run prisma:generate
npm run prisma:push
```

チームや本番運用では `prisma:push` より `npm run prisma:migrate` でマイグレーションを残す方が安全です。履歴が残るので、どの変更でDB構造が変わったかをレビューできます。

## 実装メモ

より詳しい実装解説と次に自分で実装するときの読み方は [`docs/IMPLEMENTATION_NOTES.md`](./docs/IMPLEMENTATION_NOTES.md) にまとめています。

- Server Actionsはフォーム値やIDを信用せず、Zodで検証してからDBに触ります。
- `toggleHabitLog` は `habitId` だけで更新せず、必ず `userId` も条件に含めて所有者を確認します。
- `/habits` はPrismaのモデルをそのままClient Componentへ渡さず、必要な文字列・数値・真偽値だけのView Modelに変換しています。これにより、DateやPrisma固有型のシリアライズ問題を避けます。
- ストリークや7日間の集計は `src/lib/habit-stats.ts` に分離しています。`@db.Date` に保存する値はUTC midnightへ正規化し、ローカル日付が前日にズレないようにしています。
- ランディングページはテンプレート文言を削除し、何を作ったか、なぜ見る価値があるか、どの技術を使っているかがすぐ分かる構成にしています。

## 3年目エンジニア向けの読み方

このプロジェクトを見るときは「Next.jsで画面を作った」だけでなく、境界をどこに置いたかを見ると学びが増えます。

Server ComponentはDBからデータを読む場所、Client Componentはユーザー操作を受ける場所、Server Actionsは安全にDBを書き換える場所です。この分担が曖昧になると、状態管理やセキュリティの責務が混ざってバグが増えます。

今回の実装では、認証がまだ本実装ではなくても `dev-user` を通して所有者チェックを残しています。これは「あとで認証を入れるから今は誰でも更新できてよい」としないためです。将来 `getCurrentUserId()` の中身をセッション取得に差し替えても、DB更新側の安全設計はそのまま使えます。

また、Zodスキーマと集計ロジックをUIから切り出しています。これは過剰設計ではなく、テスト対象にする価値があるロジックだけを分離するためです。全部を抽象化するのではなく、壊れると困る入力検証と日付計算だけを純粋関数に寄せています。

## 意図的な将来スコープ

以下の依存関係はインストール済みですが、この一回の改善では本実装していません。READMEで明示しておき、完成済みのように見せない方針です。

- `next-auth` / `@auth/prisma-adapter`: 本番用認証。現時点では `dev-user` フォールバックです。
- `@trpc/*` / `@tanstack/react-query` / `superjson`: 複雑なAPI層やクライアントキャッシュが必要になった段階で導入する候補です。現在のCRUD規模ではServer Actionsで十分です。
- `zustand`: 複数画面で共有するクライアント状態が出てきた場合の候補です。現在はカード単位のローカル状態で足ります。

## 品質ゲート

変更前後に最低限確認したいコマンドです。

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

DBを使う動作確認には `DATABASE_URL` とPostgreSQLが必要です。ローカルでは `docker-compose.yml` のPostgreSQLを使えます。
