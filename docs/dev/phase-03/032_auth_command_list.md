# Task 032: Auth Command List Operation

## Goal
`mcp-env auth --list`コマンドで保存された認証情報の一覧を表示する

## Tasks

### 032-1: RED - auth listのテストを書く
- [ ] mcp-env auth --listが保存された認証情報を一覧表示することを確認するテストを作成
- [ ] 認証情報がない場合のメッセージを確認するテストを作成
- [ ] セキュアな表示（値を隠す）を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 032-2: GREEN - auth listを実装
- [ ] --listオプションを追加
- [ ] AuthManagerのlistKeysを使用
- [ ] 結果の表示フォーマットを実装
- [ ] テストを実行して成功することを確認

### 032-3: REFACTOR - 表示の改善
- [ ] テーブル形式での表示
- [ ] 作成日時の表示
- [ ] フィルタリングオプション

## Definition of Done
- mcp-env auth --listで認証情報一覧が表示される
- セキュリティを考慮した表示
- テストが全て通っている