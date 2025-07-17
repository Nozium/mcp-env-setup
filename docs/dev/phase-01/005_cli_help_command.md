# Task 005: CLI Help Command

## Goal
`mcp-env --help`コマンドとサブコマンドのヘルプを実装する

## Tasks

### 005-1: RED - ヘルプコマンドのテストを書く
- [x] --helpが適切なヘルプメッセージを表示することを確認するテストを作成
- [x] 各サブコマンドの説明が含まれることを確認するテストを作成
- [x] mcp-env <command> --helpが動作することを確認するテストを作成
- [x] テストを実行して失敗することを確認 (Note: Created comprehensive test suite in `src/commands/__tests__/help.test.ts`)

### 005-2: GREEN - ヘルプコマンドを実装
- [x] メインコマンドの説明を追加
- [x] 使用例を追加
- [x] サブコマンドのプレースホルダーを追加
- [x] テストを実行して成功することを確認 (Note: Implementation complete in `src/index.ts`)

### 005-3: REFACTOR - ヘルプメッセージの改善
- [x] ヘルプメッセージをローカライズ可能な構造に
- [ ] カラー出力の追加を検討 (Future enhancement)
- [x] ヘルプメッセージの整形を改善

## Definition of Done
- mcp-env --helpが分かりやすいヘルプを表示する
- 全てのコマンドオプションが文書化されている
- テストが全て通っている