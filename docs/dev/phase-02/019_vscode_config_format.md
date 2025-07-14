# Task 019: VS Code Config Format Definition

## Goal
VS Code/Cursor用のMCP設定ファイルフォーマットを定義する

## Tasks

### 019-1: RED - VS Code設定フォーマットのテストを書く
- [ ] .vscode/mcp.json形式の構造をテストするテストを作成
- [ ] ワークスペース設定との統合を確認するテストを作成
- [ ] 設定の優先順位を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 019-2: GREEN - VS Code設定フォーマットを実装
- [ ] VSCodeMCPConfigインターフェースを定義
- [ ] ワークスペース設定の型定義
- [ ] ユーザー設定の型定義
- [ ] テストを実行して成功することを確認

### 019-3: REFACTOR - フォーマットの改善
- [ ] VS Code拡張機能との互換性確保
- [ ] 設定スキーマの最適化
- [ ] IntelliSenseサポートの考慮

## Definition of Done
- VS Code設定フォーマットが定義されている
- ワークスペースとユーザー設定の両方に対応
- テストが全て通っている