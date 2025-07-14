# Task 016: Claude Code Generator Implementation

## Goal
Claude Code（.claude.json）用の設定ジェネレーターを実装する

## Tasks

### 016-1: RED - Claude Code設定フォーマットのテストを書く
- [ ] .claude.json形式の構造をテストするテストを作成
- [ ] 必須フィールドの存在を確認するテストを作成
- [ ] generateメソッドの動作を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 016-2: GREEN - ClaudeCodeConfigGeneratorを実装
- [ ] ClaudeCodeConfigインターフェースを定義
- [ ] ClaudeCodeConfigGeneratorクラスを実装
- [ ] generateメソッドを実装
- [ ] テストを実行して成功することを確認

### 016-3: REFACTOR - 実装の改善
- [ ] Claude DesktopとClaude Codeの共通ロジックを抽出
- [ ] 基底クラスまたは共通ユーティリティの作成
- [ ] コードの重複を削減

## Definition of Done
- ClaudeCodeConfigGeneratorが実装されている
- .claude.json形式の設定が生成できる
- テストが全て通っている