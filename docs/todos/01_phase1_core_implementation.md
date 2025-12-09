
# SOW: Phase 1 - Core Implementation

## 1. Objective

This phase focuses on building the foundational components of the `mcp-env-setup` tool. The primary goal is to establish a robust and extensible architecture for managing configurations, templates, and authentication, which will serve as the backbone for all subsequent features.

## 1.1. Progress Status (2025-12-09)

| Task | Status | Notes | Issue Registration |
| --- | --- | --- | --- |
| Basic CLI Structure (`mcp-env`) | ⚠️ 部分完了 | `--version` 実装済み。`help/init/add` はスケルトンのみでテスト未着手。 | Issue: `Phase01-CLI-Help` / `Phase01-CLI-Init-Add` |
| Configuration File Generators | ⏳ 未着手 | ジェネレータークラス・テストとも未実装。 | Issue: `Phase01-Config-Generators` |
| Template System | ⏳ 未着手 | テンプレートの読み込み・一覧表示・適用ロジック未実装。 | Issue: `Phase01-Template-System` |
| Authentication Manager | ⏳ 未着手 | 永続化・CLI連携・テストすべて未実装。 | Issue: `Phase01-Auth-Manager` |

## 2. Scope of Work

### 2.1. Task: Basic CLI Structure (`mcp-env`)

- **Story:** As a user, I want a basic CLI structure with commands like `init`, `add`, `sync`, `auth`, `template` so that I can interact with the tool from my terminal.
- **Why:** A clear and consistent command structure is essential for user experience and provides the entry points for all tool functionalities.
- **Definition of Done:**
    - **TDD:** Create a test suite for the CLI command parser.
    - **Test 1 (Happy Path):** Write a test to verify that `mcp-env --version` returns the correct version number.
    - **Test 2 (Command Recognition):** Write tests to ensure that all main commands (`init`, `add`, `sync`, `auth`, `template`) and sub-commands are recognized.
    - **Test 3 (Help Output):** Write a test to check that `mcp-env --help` and `mcp-env <command> --help` display the correct help messages.
    - **Implementation:** Implement the basic command structure using a library like `commander` or `yargs`. Stub out the functionality for each command.

### 2.2. Task: Configuration File Generators

- **Story:** As a developer, I need modular configuration generators for each target tool (Claude Desktop/Code, Gemini CLI, VS Code) to create tool-specific settings from a unified server configuration.
- **Why:** This decouples the core logic from the specific formats of each tool, making it easy to add support for new tools or adapt to changes in existing ones.
- **Definition of Done:**
    - **TDD:** Create a test suite for each generator.
    - **Test 1 (Claude Desktop):** Write a test that takes a standard `MCPServer` object and verifies the generated `claude_desktop_config.json` is correct.
    - **Test 2 (Claude Code):** Write a test that verifies the generation of a valid `.claude.json` file.
    - **Test 3 (Gemini CLI):** Write a test that verifies the generation of a valid `settings.json` for Gemini CLI.
    - **Test 4 (VS Code):** Write a test that verifies the generation of a valid `.vscode/mcp.json` file.
    - **Implementation:** Create `ClaudeDesktopConfigGenerator`, `ClaudeCodeConfigGenerator`, `GeminiConfigGenerator`, and `VSCodeConfigGenerator` classes/modules. Each should have a `generate(config)` method that returns the configuration in the correct JSON format.

### 2.3. Task: Template System

- **Story:** As a user, I want to use and create templates to quickly set up my development environment for different projects (e.g., frontend, backend).
- **Why:** Templates streamline the setup process, promote consistency, and allow the community to share best practices for different development scenarios.
- **Definition of Done:**
    - **TDD:** Create a test suite for the template parser and manager.
    - **Test 1 (Template Loading):** Write a test to load a `mcp-template.yml` file and parse it into an internal `Template` object correctly.
    - **Test 2 (Template Listing):** Write a test for the `mcp-env template list` command to ensure it correctly lists available templates from the `templates/` directory.
    - **Test 3 (Template Application):** Write a test to simulate applying a template, verifying that the correct server configurations are selected based on the template's definitions.
    - **Implementation:**
        - Implement a YAML parser for `mcp-template.yml`.
        - Implement the logic for the `mcp-env template list` command.
        - Implement the core logic for `mcp-env init [template]` that reads a template and prepares the configuration.

### 2.4. Task: Authentication Manager

- **Story:** As a user, I want the tool to securely store and retrieve my API tokens so that I don't have to enter them repeatedly and they are not stored in plaintext files.
- **Why:** Securely managing sensitive credentials like API tokens is critical for security and user trust.
- **Definition of Done:**
    - **TDD:** Create a test suite for the `AuthManager` interface, using a mock of the OS keychain.
    - **Test 1 (Store):** Write a test to verify that `authManager.store('my_key', 'my_token')` successfully calls the keychain mock.
    - **Test 2 (Retrieve):** Write a test to verify that `authManager.retrieve('my_key')` returns the correct token from the mock.
    - **Test 3 (Delete):** Write a test to verify that `authManager.delete('my_key')` successfully removes the key from the mock.
    - **Test 4 (List):** Write a test to verify that `authManager.listKeys()` returns a list of stored keys.
    - **Implementation:** Implement an `AuthManager` class that interfaces with OS-native keychain/credential managers (e.g., using a library like `keytar`). Implement the `mcp-env auth <server>` command to interact with the manager.

## 3. Schedule

- Estimated completion: 2 weeks

## 4. Deliverables

- Source code for the core components.
- Unit and integration tests for all implemented features.
- A functional CLI capable of parsing commands and managing templates/auth.
