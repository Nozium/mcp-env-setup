# Task 020: VS Code Generator Implementation

## Goal
VS Code/Cursor用の設定ジェネレーターを実装する

## Tasks

### 020-1: RED - VSCodeConfigGeneratorのテストを書く
- [ ] generateメソッドの基本動作をテストするテストを作成
- [ ] ワークスペース設定の生成を確認するテストを作成
- [ ] --globalオプションでのユーザー設定生成を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 020-2: GREEN - VSCodeConfigGeneratorを実装
- [ ] VSCodeConfigGeneratorクラスを作成
- [ ] generateメソッドを実装
- [ ] ワークスペース/ユーザー設定の切り替えロジック
- [ ] テストを実行して成功することを確認

### 020-3: REFACTOR - 実装の改善
- [ ] 設定ファイルパスの解決ロジックを改善
- [ ] プラットフォーム固有のパスを処理
- [ ] エラーハンドリングの強化

## Definition of Done
- VSCodeConfigGeneratorが実装されている
- ワークスペースとユーザー設定の両方を生成できる
- テストが全て通っている