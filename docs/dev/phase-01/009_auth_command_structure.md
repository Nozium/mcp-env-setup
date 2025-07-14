# Task 009: Auth Command Structure

## Goal
`mcp-env auth`コマンドの基本構造を実装する

## Tasks

### 009-1: RED - authコマンドの存在テストを書く
- [ ] mcp-env authコマンドが認識されることを確認するテストを作成
- [ ] authコマンドがサーバー名引数を受け付けることを確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 009-2: GREEN - authコマンドの基本実装
- [ ] authコマンドをCommanderに登録
- [ ] サーバー名引数の定義
- [ ] 基本的なコマンドハンドラーを実装
- [ ] テストを実行して成功することを確認

### 009-3: REFACTOR - コマンド構造の改善
- [ ] authコマンドを別ファイルに分離
- [ ] サブコマンド構造の準備（add, remove, list）
- [ ] セキュリティ考慮事項のコメント追加

## Definition of Done
- mcp-env auth <server>が実行できる
- コマンドが適切に登録されている
- テストが全て通っている