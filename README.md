# 整理くん (Sei-ri-kun)

プロジェクト構成の可視化とドキュメント作成を支援するツールです。

## 機能

- プロジェクトのディレクトリ構造をツリー形式で可視化
- Gitの状態（ブランチ、コミット履歴、変更状態）の表示
- プロジェクトのドキュメント自動生成

## インストール

```bash
npm install
```

## 使い方

### プロジェクト構造の可視化

```bash
node src/index.js visualize [options]
```

オプション:
- `-p, --path <path>`: 可視化するプロジェクトのパス（デフォルト: カレントディレクトリ）
- `-i, --ignore <patterns...>`: 無視するファイルパターン

### Gitの状態表示

```bash
node src/index.js git [options]
```

オプション:
- `-p, --path <path>`: Gitリポジトリのパス（デフォルト: カレントディレクトリ）

### ドキュメント生成

```bash
node src/index.js docs [options]
```

オプション:
- `-p, --path <path>`: ドキュメントを生成するプロジェクトのパス（デフォルト: カレントディレクトリ）
- `-o, --output <path>`: 出力先ディレクトリ（デフォルト: ./docs）

## 開発

### 依存関係のインストール

```bash
npm install
```

### テストの実行

```bash
npm test
```

## ライセンス

MIT 