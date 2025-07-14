# MCP開発環境セットアップツール設計書

## 調査結果サマリー

### 各ツールのMCP対応状況

#### 1. Claude Desktop
- **設定ファイル**: `claude_desktop_config.json`
- **場所**: 
  - macOS: `~/Library/Application Support/Claude/`
  - Windows: `%APPDATA%/Claude/`
- **設定形式**:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "API_KEY": "..."
      }
    }
  }
}
```
- **特徴**: 
  - STDIO transport使用
  - Desktop Extensions (.dxt)サポート
  - GUI経由での設定も可能

#### 2. Claude Code
- **設定ファイル**: `.claude.json` / `mcp.json`
- **スコープ**: Local / Project / User
- **設定形式**:
```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {}
    }
  }
}
```
- **特徴**:
  - 3段階のスコープ管理
  - CLI経由での設定 (`claude mcp add`)
  - devcontainer連携可能

#### 3. Gemini CLI
- **設定ファイル**: `settings.json`
- **場所**: 
  - Global: `~/.gemini/settings.json`
  - Project: `.gemini/settings.json`
- **設定形式**:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {},
      "trust": false
    }
  }
}
```
- **特徴**:
  - ReActループ統合
  - Trust設定による権限管理
  - VS Code拡張としても利用可能

#### 4. VS Code / Cursor
- **設定ファイル**: 
  - Workspace: `.vscode/mcp.json`
  - User: settings.json内のmcp設定
- **設定形式**:
```json
{
  "servers": {
    "server-name": {
      "type": "stdio",
      "command": "command",
      "args": [],
      "env": {}
    }
  }
}
```
- **特徴**:
  - GitHub Copilot Chat統合
  - Workspace/User設定分離
  - 自動ディスカバリー対応

### devcontainer連携状況

1. **Claude Code**: 公式devcontainerテンプレート提供
2. **Gemini CLI**: 設定ファイルベースでコンテナ内設定可能
3. **VS Code**: devcontainer.json内でのMCP設定拡張可能
4. **Docker Desktop**: MCP Toolkit拡張でコンテナ化されたMCPサーバー提供

## 設計方針

### 1. 基本コンセプト
- **マルチツール対応**: 主要なAIツール（Claude Desktop/Code、Gemini CLI、VS Code/Cursor）すべてに対応
- **テンプレート駆動**: 環境別の設定テンプレートを提供
- **自動セットアップ**: devcontainer起動時の自動MCP登録
- **認証管理**: API TOKEN等の安全な管理と設定

### 2. ツール構成

#### 2.1 CLI ツール
```bash
npm install -g mcp-env-setup
```

#### 2.2 コマンド構造
```bash
mcp-env init [template]          # 環境初期化
mcp-env add <server> [options]   # MCPサーバー追加
mcp-env sync                     # 設定同期
mcp-env auth <server>            # 認証設定
mcp-env template list            # テンプレート一覧
mcp-env template create <name>   # カスタムテンプレート作成
```

### 3. テンプレート設計

#### 3.1 テンプレート構造
```
templates/
├── base/                    # 基本テンプレート
│   ├── claude-desktop/
│   ├── claude-code/
│   ├── gemini-cli/
│   └── vscode/
├── environments/            # 環境別テンプレート
│   ├── frontend/           # フロントエンド開発
│   ├── backend/            # バックエンド開発
│   ├── fullstack/          # フルスタック開発
│   ├── ml/                 # 機械学習
│   └── devops/             # DevOps
└── custom/                 # ユーザーカスタム
```

#### 3.2 テンプレート定義ファイル
```yaml
# templates/frontend/mcp-template.yml
name: "Frontend Development"
description: "React/Vue/Angular開発環境"
version: "1.0.0"

targets:
  - claude-desktop
  - claude-code  
  - gemini-cli
  - vscode

servers:
  - name: "filesystem"
    package: "@modelcontextprotocol/server-filesystem"
    args: ["/workspaces", "/tmp"]
    
  - name: "npm-scripts"
    package: "mcp-server-npm"
    required_env:
      - NODE_ENV
      
  - name: "github"
    package: "@modelcontextprotocol/server-github"
    required_auth:
      - GITHUB_PERSONAL_ACCESS_TOKEN

devcontainer:
  enabled: true
  base_image: "mcr.microsoft.com/devcontainers/typescript-node"
  features:
    - "ghcr.io/devcontainers/features/docker-in-docker"
  post_create_command: "mcp-env sync"
```

### 4. 認証管理

#### 4.1 認証フロー
1. **トークン要求**: 初回セットアップ時にAPI TOKENを要求
2. **安全な保存**: OS keychain/credential managerに保存
3. **環境変数注入**: devcontainer/ツール起動時に自動注入

#### 4.2 対応認証プロバイダー
- GitHub Personal Access Token
- Google API Key (Gemini)
- OpenAI API Key
- Anthropic API Key
- その他カスタムAPI

### 5. devcontainer統合

#### 5.1 自動セットアップフック
```json
// .devcontainer/devcontainer.json
{
  "postCreateCommand": "mcp-env sync --auto",
  "postStartCommand": "mcp-env start-servers",
  "mounts": [
    "source=${localEnv:HOME}/.mcp-env,target=/root/.mcp-env,type=bind"
  ]
}
```

#### 5.2 設定同期メカニズム
- ホストマシンの設定をコンテナに同期
- 環境変数の安全な受け渡し
- ツール固有設定の自動生成

### 6. 実装アーキテクチャ

#### 6.1 核心コンポーネント

```typescript
// Core Configuration Manager
interface MCPConfig {
  servers: MCPServer[];
  templates: Template[];
  environments: Environment[];
  auth: AuthConfig;
}

interface MCPServer {
  name: string;
  package: string;
  args?: string[];
  env?: Record<string, string>;
  required_auth?: string[];
  targets: MCPTarget[];
}

interface MCPTarget {
  tool: 'claude-desktop' | 'claude-code' | 'gemini-cli' | 'vscode';
  config_path: string;
  format: 'json' | 'yaml';
  merge_strategy: 'replace' | 'merge';
}
```

#### 6.2 設定ジェネレーター
各ツール用の設定ファイル生成器:
- `ClaudeDesktopConfigGenerator`
- `ClaudeCodeConfigGenerator`  
- `GeminiConfigGenerator`
- `VSCodeConfigGenerator`

#### 6.3 認証マネージャー
```typescript
interface AuthManager {
  store(key: string, token: string): Promise<void>;
  retrieve(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  listKeys(): Promise<string[]>;
}
```

### 7. 配布戦略

#### 7.1 npm package
- メインツール: `mcp-env-setup`
- テンプレートパック: `@mcp-templates/frontend`, `@mcp-templates/backend`

#### 7.2 GitHub Actions統合
```yaml
# .github/workflows/setup-mcp.yml
- name: Setup MCP Environment
  uses: mcp-env-setup/setup-action@v1
  with:
    template: 'frontend'
    tools: 'claude-code,vscode'
```

## 実装フェーズ

### Phase 1: Core Implementation
- [ ] 基本CLI構造
- [ ] 設定ファイル生成器
- [ ] テンプレートシステム
- [ ] 認証マネージャー

### Phase 2: Tool Integration  
- [ ] Claude Desktop/Code対応
- [ ] Gemini CLI対応
- [ ] VS Code/Cursor対応
- [ ] devcontainer統合

### Phase 3: Advanced Features
- [ ] GUI ツール
- [ ] プラグインシステム
- [ ] チーム設定共有
- [ ] クラウド同期

## 競合優位性

1. **統一インターフェース**: 複数ツールを一元管理
2. **自動化**: devcontainer連携による自動セットアップ
3. **セキュリティ**: 認証情報の安全な管理
4. **拡張性**: テンプレートとプラグインによる柔軟性
5. **コミュニティ**: オープンソースでの開発とテンプレート共有
