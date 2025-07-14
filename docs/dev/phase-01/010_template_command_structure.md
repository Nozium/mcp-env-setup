# Task 010: Template Command Structure

## Goal
`mcp-env template`コマンドの基本構造を実装する

## Tasks

### 010-1: RED - templateコマンドの存在テストを書く
- [ ] mcp-env templateコマンドが認識されることを確認するテストを作成
- [ ] templateコマンドがサブコマンドを持つことを確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 010-2: GREEN - templateコマンドの基本実装
- [ ] templateコマンドをCommanderに登録
- [ ] listサブコマンドの定義
- [ ] 基本的なコマンドハンドラーを実装
- [ ] テストを実行して成功することを確認

### 010-3: REFACTOR - コマンド構造の改善
- [ ] templateコマンドを別ファイルに分離
- [ ] サブコマンド構造の整理
- [ ] 将来のサブコマンド（create, delete等）の準備

## Definition of Done
- mcp-env template listが実行できる
- コマンドが適切に登録されている
- テストが全て通っている