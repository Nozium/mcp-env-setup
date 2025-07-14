# Task 014: Claude Desktop Config Format

## Goal
Claude Desktop設定ファイルのフォーマットを定義し、型を作成する

## Tasks

### 014-1: RED - Claude Desktop設定フォーマットのテストを書く
- [ ] mcpServersオブジェクトの構造をテストするテストを作成
- [ ] 各サーバー設定の必須フィールドをテストするテストを作成
- [ ] JSONとして正しくシリアライズされることを確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 014-2: GREEN - 設定フォーマットを実装
- [ ] ClaudeDesktopConfigインターフェースを定義
- [ ] mcpServersの型定義
- [ ] 各サーバー設定の型定義
- [ ] テストを実行して成功することを確認

### 014-3: REFACTOR - フォーマットの改善
- [ ] 型の厳密性を向上
- [ ] オプショナルフィールドの整理
- [ ] 実際のClaude Desktopの仕様との整合性確認

## Definition of Done
- Claude Desktop設定フォーマットが定義されている
- 型安全な設定オブジェクトが作成できる
- テストが全て通っている