# Task 017: Gemini Config Format Definition

## Goal
Gemini CLI設定ファイルのフォーマットを定義する

## Tasks

### 017-1: RED - Gemini設定フォーマットのテストを書く
- [ ] settings.json形式の構造をテストするテストを作成
- [ ] mcpServersセクションの存在を確認するテストを作成
- [ ] trustプロパティの動作を確認するテストを作成
- [ ] テストを実行して失敗することを確認

### 017-2: GREEN - Gemini設定フォーマットを実装
- [ ] GeminiConfigインターフェースを定義
- [ ] mcpServersの型定義
- [ ] trustプロパティの型定義
- [ ] テストを実行して成功することを確認

### 017-3: REFACTOR - フォーマットの改善
- [ ] 既存設定との互換性を考慮
- [ ] 将来の拡張性を確保
- [ ] ドキュメントコメントを充実

## Definition of Done
- Gemini設定フォーマットが定義されている
- 型安全な設定オブジェクトが作成できる
- テストが全て通っている