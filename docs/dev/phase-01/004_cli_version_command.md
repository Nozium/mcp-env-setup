# Task 004: CLI Version Command

## Goal
`mcp-env --version`コマンドを実装する

## Tasks

### 004-1: RED - バージョンコマンドのテストを書く
- [x] CLIがバージョン番号を返すことを確認するテストを作成
- [x] --versionと-vの両方が動作することを確認するテストを作成
- [x] バージョン番号の形式を検証するテストを作成
- [x] テストを実行して失敗することを確認

### 004-2: GREEN - バージョンコマンドを実装
- [x] Commanderをセットアップ
- [x] package.jsonからバージョンを読み込む処理を実装
- [x] --versionオプションを追加
- [x] テストを実行して成功することを確認

### 004-3: REFACTOR - コードの改善
- [x] バージョン読み込みロジックを別モジュールに分離
- [x] エラーハンドリングを追加
- [x] 型定義を強化

## Definition of Done
- mcp-env --versionが正しいバージョン番号を表示する
- テストが全て通っている
- package.jsonのversionと一致している