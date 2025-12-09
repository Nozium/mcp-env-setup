
# SOW: Phase 2 - Tool Integration

## 1. Objective

This phase focuses on integrating the core components with the target AI development tools. The goal is to enable the `mcp-env-setup` tool to read, write, and synchronize MCP server configurations across Claude Desktop, Claude Code, Gemini CLI, and VS Code/Cursor, including robust support for `devcontainer` environments.

## 1.1. Progress Status (2025-12-09)

| Task | Status | Notes | Issue Registration |
| --- | --- | --- | --- |
| Claude Desktop/Code Integration | ⏳ 未着手 | Phase-01 の CLI/ジェネレーター未完了につき着手前。 | Issue: `Phase02-Claude-Integration` |
| Gemini CLI Integration | ⏳ 未着手 | 依存するジェネレーターとsync処理が未実装。 | Issue: `Phase02-Gemini-Integration` |
| VS Code/Cursor Integration | ⏳ 未着手 | `.vscode/mcp.json` 生成ロジック未実装。 | Issue: `Phase02-VSCode-Integration` |
| Devcontainer Integration | ⏳ 未着手 | devcontainer連携・postCreateCommand未設計。 | Issue: `Phase02-Devcontainer` |

## 2. Scope of Work

### 2.1. Task: Claude Desktop/Code Integration

- **Story:** As a user of Claude tools, I want to manage my MCP server configurations using `mcp-env-setup` so that my settings are consistent and easily configurable.
- **Why:** Direct integration automates the manual process of editing JSON configuration files, reducing errors and saving time.
- **Definition of Done:**
    - **TDD:** Create an integration test suite for Claude tools.
    - **Test 1 (Read Config):** Write a test to read an existing `claude_desktop_config.json` and `.claude.json` and parse them into the internal `MCPConfig` model.
    - **Test 2 (Write Config):** Write a test that uses the `ClaudeDesktopConfigGenerator` and `ClaudeCodeConfigGenerator` to write a new configuration file. Verify the file content and structure.
    - **Test 3 (Sync Command):** Write a test for the `mcp-env sync` command that reads a local `mcp-template.yml`, generates the appropriate Claude configurations, and writes them to the correct file paths (e.g., `~/Library/Application Support/Claude/` and `./.claude.json`).
    - **Implementation:**
        - Implement file I/O logic to find and parse the configuration files for both Claude Desktop and Claude Code.
        - Integrate the generators from Phase 1 into the `mcp-env sync` command.
        - Handle different configuration scopes (e.g., Project vs. User for Claude Code).

### 2.2. Task: Gemini CLI Integration

- **Story:** As a Gemini CLI user, I want `mcp-env-setup` to automatically configure my MCP servers so that I can use them within the Gemini ReAct loop.
- **Why:** Automating this setup makes it easier to leverage custom tools and environments within Gemini CLI, enhancing its capabilities.
- **Definition of Done:**
    - **TDD:** Create an integration test suite for Gemini CLI.
    - **Test 1 (Read Config):** Write a test to read `~/.gemini/settings.json` and `.gemini/settings.json` and correctly parse the `mcpServers`.
    - **Test 2 (Write Config):** Write a test that uses the `GeminiConfigGenerator` to add a new server to the settings file, preserving existing settings.
    - **Test 3 (Trust Setting):** Write a test to verify that the `trust` property can be set correctly via an option like `mcp-env add <server> --trust`.
    - **Implementation:**
        - Implement logic to locate and update Gemini CLI's `settings.json` at both the global and project level.
        - Integrate the `GeminiConfigGenerator` into the `mcp-env sync` and `mcp-env add` commands.

### 2.3. Task: VS Code/Cursor Integration

- **Story:** As a VS Code or Cursor user, I want `mcp-env-setup` to manage my workspace-specific MCP configurations so that my editor is automatically set up for my project.
- **Why:** This allows for project-specific tool configurations that can be shared with a team via the `.vscode` directory, ensuring a consistent development environment.
- **Definition of Done:**
    - **TDD:** Create an integration test suite for VS Code.
    - **Test 1 (Read Config):** Write a test to read `.vscode/mcp.json` and user `settings.json` to parse existing MCP configurations.
    - **Test 2 (Write Config):** Write a test that uses the `VSCodeConfigGenerator` to create or update the `.vscode/mcp.json` file.
    - **Test 3 (Workspace vs. User):** Write tests to ensure the tool correctly targets workspace settings (`.vscode/mcp.json`) by default and can target user settings with a flag (e.g., `mcp-env sync --global`).
    - **Implementation:**
        - Implement logic to manage configurations within the `.vscode` directory.
        - Integrate the `VSCodeConfigGenerator` into the `sync` and `add` commands.

### 2.4. Task: Devcontainer Integration

- **Story:** As a developer using devcontainers, I want my MCP environment to be automatically set up and synchronized when I start my container.
- **Why:** This provides a zero-configuration experience for developers joining a project, as the entire toolchain and environment are defined in code.
- **Definition of Done:**
    - **TDD:** Create a test suite for devcontainer functionality.
    - **Test 1 (Hook Detection):** Write a test to verify that the tool can detect when it's running inside a devcontainer and that the `postCreateCommand` hook is working.
    - **Test 2 (Config Sync):** Write a test to simulate the `mcp-env sync --auto` command, ensuring it correctly mounts and reads the host configuration and applies it within the container.
    - **Test 3 (Auth Injection):** Write a test to verify that the `AuthManager` can inject required API tokens as environment variables into the container's context during the sync process.
    - **Implementation:**
        - Implement the `postCreateCommand` logic in `mcp-env sync --auto`.
        - Implement the logic to securely pass credentials from the host's keychain to the container's environment.
        - Create example `devcontainer.json` files and documentation showing users how to set up the hooks.

## 3. Schedule

- Estimated completion: 3 weeks

## 4. Deliverables

- Fully integrated support for all four target toolsets.
- A seamless devcontainer setup experience.
- Comprehensive integration tests and documentation for each integration.
