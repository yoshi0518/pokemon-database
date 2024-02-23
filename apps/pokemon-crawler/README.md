# Pokemon Crawler

## How to Use

### Init

```bash
# .env.sampleを複製し、ファイル名を.envに変更

# DATABASE_URLを接続先DBに合わせて修正
```

### Prisma

```bash
# Prisma初期化
$ pnpm dlx prisma init

# `prisma/models/base.prisma` のDB接続情報を修正

# `prisma/models/xxx.prisma` を追加

# マイグレーション適用
$ pnpm prisma:push

# Prismaクライアント更新
$ pnpm prisma:generate

# TypeScriptコンパイル
$ pnpm build

# Node処理実行
$ node dist/xxx.js
```
