# 整理くん (Sei-ri-kun)

## 1. プロジェクト概要

整理くん (Sei-ri-kun) は、プロジェクト構成の可視化とドキュメント生成を行うCLIツールです。

## 2. 主な機能

- ディレクトリ構造のツリー表示
- Gitの状態確認（ブランチ、最新コミット、変更一覧）
- STRUCTURE.md や README.md の自動生成（Markdown形式）

## 3. インストール方法

### GitHubからのインストール

```bash
# リポジトリをクローン
git clone https://github.com/themut000/sei-ri-kun.git

# プロジェクトディレクトリに移動
cd sei-ri-kun

# 依存関係をインストール
npm install

# CLIコマンドをグローバルに登録
npm link
```

### よくあるエラーと対処方法

1. `repository not found` エラー
   - 原因：リポジトリURLが間違っている
   - 対処：正しいURL（`https://github.com/themut000/sei-ri-kun.git`）を使用しているか確認

2. `ENOENT: no such file or directory` エラー
   - 原因：プロジェクトディレクトリが存在しない
   - 対処：`cd sei-ri-kun` を実行する前に、正しいディレクトリにいることを確認

3. `command not found: 整理くん` エラー
   - 原因：`npm link` が実行されていない
   - 対処：プロジェクトディレクトリで `npm link` を実行

## 4. 使い方

### 基本的な使い方

```bash
整理くん [path]
```

### オプション

- `-i, --ignore <patterns...>`: 無視するファイルパターン
- `-g, --git`: Gitの状態も表示
- `-d, --docs`: ドキュメントを生成
- `-o, --output <path>`: ドキュメントの出力先ディレクトリ（デフォルト: ./docs）

### 使用例

1. プロジェクト構造の可視化のみ：
```bash
整理くん ./my-project
```

2. Gitの状態も表示：
```bash
整理くん ./my-project --git
```

3. ドキュメントも生成：
```bash
整理くん ./my-project --docs
```

4. すべての機能を使用：
```bash
整理くん ./my-project --git --docs
```

5. 特定のファイルを無視：
```bash
整理くん ./my-project --ignore "*.log" --ignore "node_modules"
```

6. ドキュメントの出力先を指定：
```bash
整理くん ./my-project --docs --output ./my-docs
```

### 出力例

```
📁 プロジェクト構造の可視化: ./my-project

├── README.md
├── package.json
├── src/
│   ├── index.js
│   └── commands/
│       ├── visualize.js
│       ├── git.js
│       └── docs.js
└── tests/
    └── index.test.js

📊 Gitの状態
現在のブランチ: main
最新のコミット: abc1234
変更状態:
  - 変更されたファイル: README.md
  - 未追跡のファイル: .env

📝 ドキュメント生成
✨ 処理が完了しました！
```

## 5. 開発

```bash
npm install
npm test
```

## 6. ライセンス

MIT

## リポジトリ

- GitHub: [themut000/sei-ri-kun](https://github.com/themut000/sei-ri-kun)
- Issues: [GitHub Issues](https://github.com/themut000/sei-ri-kun/issues) 