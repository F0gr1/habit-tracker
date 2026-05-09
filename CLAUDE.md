# 習慣トラッカー：個人開発プロジェクト

## このプロジェクトの目的
機能を完成させることより、技術を深く理解することを優先する。
コードを提案するときは必ず「なぜそう書くか」の理由を添えること。

## 技術スタック
- Frontend: Next.js 16.2 (App Router) + TypeScript + Tailwind CSS
- 状態管理: Zustand（グローバル）/ useState（ローカル）
- API: tRPC + Zod
- 認証: NextAuth.js
- DB: Prisma + PostgreSQL (Supabase)
- Deploy: Vercel

## コーディング規約
- コンポーネントは Server / Client を必ず意識して分ける
- 'use client' をつける理由をコメントで残す
- any 型は禁止。必ず型を定義する
- ファイル名はケバブケース（habit-card.tsx）

## ディレクトリ構成
src/
├── app/          # Next.js App Router のページ
├── components/   # UIコンポーネント
├── server/       # tRPC router
├── lib/          # 共通ユーティリティ
└── types/        # 型定義

## よく使うコマンド
- dev: npm run dev
- DB反映: npx prisma db push
- 型生成: npx prisma generate

## 学習上のルール（重要）
- コードを書く前に設計の意図を説明すること
- 複数の実装方法がある場合は選択肢を提示してトレードオフを説明すること
- 「なんとなく」で実装しない。判断理由を必ず言語化すること
- 詰まったときはコードより先に原因の仮説を出すこと