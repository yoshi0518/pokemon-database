# Pokemon Database

## アプリ・パッケージ一覧

| ディレクトリ               | 内容                 |
| -------------------------- | -------------------- |
| apps/pokemon-database-v1   | Pokemon DB(v1)       |
| packages/eslint-config     | ESLint 共通設定      |
| packages/prettier-config   | Prettier 共通設定    |
| packages/tailwind-config   | TailwindCSS 共通設定 |
| packages/typescript-config | Typescript 共通設定  |

## How to Use

### 環境準備

```bash
# 作業リポジトリをクローン
$ git clone git@github.com:yoshi0518/pokemon-database.git

# インストール
$ pnpm i
```

### コマンド実行方法

```bash
# Format
$ pnpm fmt

# Lint
$ pnpm lint

# 開発サーバー起動
$ pnpm dev

# デプロイ・起動
$ pnpm build
$ pnpm start

# Storybook起動
$ pnpm storybook
```
