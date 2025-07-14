# Task 031: Auth Command Store Operation

## Goal
`mcp-env auth <server>`コマンドで認証情報を保存する機能を実装する

## Tasks

### 031-1: RED - auth storeのテストを書く
- [ ] mcp-env auth anthropicが認証情報を保存することを確認するテストを作成
- [ ] インタラクティブなパスワード入力をテストするテストを作成
- [ ] 既存の認証情報を上書きする際の確認をテストするテストを作成
- [ ] テストを実行して失敗することを確認

### 031-2: GREEN - auth storeを実装
- [ ] authコマンドハンドラーを実装
- [ ] パスワード入力プロンプトを実装
- [ ] AuthManagerを使用して保存を実装
- [ ] テストを実行して成功することを確認

### 031-3: REFACTOR - コマンドの改善
- [ ] 入力のマスキング実装
- [ ] 確認メッセージの改善
- [ ] エラーハンドリングの強化

## Definition of Done
- mcp-env auth <server>で認証情報を保存できる
- パスワードが安全に入力される
- テストが全て通っている