# 整理くん (Sei-ri-kun)

## 1. プロジェクト概要

整理くん (Sei-ri-kun) は、プロジェクト構成の可視化とドキュメント生成を行うCLIツールです。

## 2. 主な機能

- ディレクトリ構造のツリー表示
- Gitの状態確認（ブランチ、最新コミット、変更一覧）
- STRUCTURE.md や README.md の自動生成（Markdown形式）

## 3. インストール方法（GitHubから）

```bash
git clone https://github.com/mut-ar-com/sei-ri-kun.git
cd sei-ri-kun
npm install
npm link
```

このあと、以下のようにコマンドが使えます：

```bash
整理くん ./my-project
```

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

## 5. 開発

```bash
npm install
npm test
```

## 6. ライセンス

MIT

## リポジトリ

- GitHub: [mut-ar-com/haihin](https://github.com/mut-ar-com/haihin)
- Issues: [GitHub Issues](https://github.com/mut-ar-com/haihin/issues) 