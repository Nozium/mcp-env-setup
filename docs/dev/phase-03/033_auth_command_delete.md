# Task 033: Auth Command Delete Operation

## Goal
`mcp-env auth --delete <server>`コマンドで認証情報を削除する

## Tasks

### 033-1: RED - auth deleteのテストを書く
- [ ] mcp-env auth --delete anthropicが認証情報を削除することを確認するテストを作成
- [ ] 存在しない認証情報の削除でエラーメッセージを確認するテストを作成
- [ ] 削除前の確認プロンプトをテストするテストを作成
- [ ] テストを実行して失敗することを確認

### 033-2: GREEN - auth deleteを実装
- [ ] --deleteオプションを追加
- [ ] 削除確認プロンプトを実装
- [ ] AuthManagerのdeleteを使用
- [ ] テストを実行して成功することを確認

### 033-3: REFACTOR - コマンドの改善
- [ ] --forceオプションで確認をスキップ
- [ ] バッチ削除のサポート
- [ ] 削除結果の詳細表示

## Definition of Done
- mcp-env auth --delete <server>で認証情報を削除できる
- 適切な確認とエラーハンドリング
- テストが全て通っている