# Task 015: Claude Desktop Generator Generate Method

## Goal
ClaudeDesktopConfigGeneratorのgenerateメソッドを実装する

## Tasks

### 015-1: RED - generateメソッドのテストを書く
- [ ] MCPConfigを入力として受け取ることを確認するテストを作成
- [ ] 正しいClaude Desktop形式の出力を返すことを確認するテストを作成
- [ ] 複数のサーバー設定を正しく変換することを確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 015-2: GREEN - generateメソッドを実装
- [ ] generateメソッドの基本実装
- [ ] MCPServerからClaude Desktop形式への変換ロジック
- [ ] 環境変数の適切なマッピング
- [ ] テストを実行して成功することを確認

### 015-3: REFACTOR - 実装の改善
- [ ] 変換ロジックを小さな関数に分割
- [ ] エラーハンドリングを追加
- [ ] パフォーマンスの最適化

## Definition of Done
- generateメソッドが正しく動作する
- MCPConfigからClaude Desktop設定への変換が完璧
- テストが全て通っている