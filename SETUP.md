# 習慣トラッカー セットアップ記録

## 技術スタック

| 役割 | 技術 |
|------|------|
| フロント | Next.js 16.2 (App Router) + TypeScript + Tailwind CSS |
| 状態管理 | Zustand |
| API通信 | tRPC v11 |
| 認証 | NextAuth.js v5 (beta) |
| DB | Prisma 7 + PostgreSQL (Supabase) |
| デプロイ | Vercel |

---

## やったこと

### 1. プロジェクト作成

```bash
npx create-next-app@latest habit-tracker \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --no-turbopack
```

オプションの意味：

| オプション | 内容 |
|-----------|------|
| `--typescript` | TypeScript を使う |
| `--tailwind` | Tailwind CSS を含める |
| `--app` | App Router を使う |
| `--src-dir` | ソースを `src/` 以下に置く |
| `--import-alias "@/*"` | `@/` で `src/` を参照できる |
| `--no-turbopack` | 安定版 webpack を使う |

---

### 2. パッケージインストール

```bash
npm install \
  prisma @prisma/client @auth/prisma-adapter \
  next-auth@beta \
  @trpc/server@next @trpc/client@next @trpc/react-query@next \
  @tanstack/react-query@latest \
  zod zustand superjson
```

| パッケージ | バージョン | 役割 |
|-----------|-----------|------|
| `prisma` | 7.x | ORM CLI |
| `@prisma/client` | 7.x | DB アクセス |
| `@auth/prisma-adapter` | latest | NextAuth ↔ Prisma をつなぐ |
| `next-auth` | v5 beta | 認証 |
| `@trpc/server` + `client` + `react-query` | v11 | 型安全 API |
| `@tanstack/react-query` | v5 | サーバー状態管理 |
| `zod` | latest | スキーマバリデーション |
| `zustand` | latest | クライアント状態管理 |
| `superjson` | latest | tRPC のシリアライズ（Date型対応） |

---

### 3. Prisma 初期化

```bash
npx prisma init --datasource-provider postgresql
```

生成されたファイル：
- `prisma/schema.prisma` — スキーマ定義（カスタム済み）
- `prisma.config.ts` — Prisma 設定
- `.env` — 環境変数（DB接続先など）

#### Prisma 7 の注意点

Prisma 7 では generator の書き方が変わっている：

```prisma
generator client {
  provider = "prisma-client"   // ← "prisma-client-js" ではない
  output   = "../src/generated/prisma"
}
```

インポートも変わる：

```ts
// 旧（Prisma 5以前）
import { PrismaClient } from "@prisma/client";

// 新（Prisma 7）
import { PrismaClient } from "@/generated/prisma";
```

---

### 4. Prisma スキーマ

`prisma/schema.prisma` に以下のモデルを定義：

#### NextAuth 必須モデル
- `User` — ユーザー情報
- `Account` — OAuth プロバイダーアカウント
- `Session` — ログインセッション
- `VerificationToken` — メール確認トークン

#### アプリ固有モデル
- `Habit` — 習慣の定義（名前・色・頻度など）
- `HabitLog` — 習慣の達成記録（日付ごと）

**ER 概略：**
```
User
 ├── Account[] （1対多）
 ├── Session[] （1対多）
 └── Habit[]   （1対多）
       └── HabitLog[] （1対多、同一日は1件まで）
```

`HabitLog` の `@@unique([habitId, date])` により、同じ習慣・同じ日の重複を DB レベルで防止。

---

### 5. Prisma クライアント singleton

`src/lib/prisma.ts` に開発時のホットリロードによる接続過多を防ぐ singleton パターンを配置：

```ts
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

使う側は `import { prisma } from "@/lib/prisma"` だけでOK。

---

## 次にやること（自分で）

### 環境変数の設定

`.env` を開いて以下を埋める：

```env
DATABASE_URL="..."       # Supabase の接続文字列
AUTH_SECRET=""           # npx auth secret で生成
GOOGLE_CLIENT_ID=""      # Google Cloud Console から
GOOGLE_CLIENT_SECRET=""  # Google Cloud Console から
```

### DB マイグレーション

Supabase の DATABASE_URL を設定してから：

```bash
npx prisma migrate dev --name init
```

### 型の生成（schema変更時）

```bash
npx prisma generate
```

### Prisma Studio（GUI でデータ確認）

```bash
npx prisma studio
```

---

## ディレクトリ構成（現在）

```
habit-tracker/
├── prisma/
│   ├── schema.prisma     ✅ 定義済み
│   └── migrations/       （migrate dev 後に生成）
├── src/
│   ├── app/              （自分で実装）
│   ├── generated/
│   │   └── prisma/       （prisma generate 後に生成）
│   └── lib/
│       └── prisma.ts     ✅ singleton クライアント
├── .env                  ✅ 環境変数テンプレート
└── SETUP.md              ✅ この記録
```

---

## 参考リンク

- [Prisma 7 docs](https://www.prisma.io/docs)
- [NextAuth v5 docs](https://authjs.dev)
- [tRPC v11 docs](https://trpc.io/docs)
- [Supabase connection string](https://supabase.com/dashboard/project/_/settings/database)
