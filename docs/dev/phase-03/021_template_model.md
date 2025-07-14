# Task 021: Template Model Definition

## Goal
テンプレートシステムのデータモデルを定義する

## Tasks

### 021-1: RED - Templateモデルのテストを書く
- [ ] Templateインターフェースの基本構造をテストするテストを作成
- [ ] 必須フィールド（name, description, servers）を確認するテストを作成
- [ ] オプショナルフィールド（tags, author）を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 021-2: GREEN - Templateモデルを実装
- [ ] Templateインターフェースを定義
- [ ] ServerDefinitionインターフェースを定義
- [ ] テンプレートのメタデータ型を定義
- [ ] テストを実行して成功することを確認

### 021-3: REFACTOR - モデルの改善
- [ ] バリデーション関数を追加
- [ ] デフォルト値の定義
- [ ] 型の厳密性を向上

## Definition of Done
- Templateインターフェースが定義されている
- テンプレートの全必要情報が表現できる
- テストが全て通っている