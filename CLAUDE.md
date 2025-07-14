# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the MCP Environment Setup Tool - a CLI utility for managing Model Context Protocol (MCP) server configurations across multiple AI development environments including Claude Desktop/Code, Gemini CLI, and VS Code/Cursor.

## Development Commands

Currently, the project is in initial setup phase. As development progresses, add:
- Build commands for TypeScript compilation
- Test runner commands (planned TDD approach)
- Linting and formatting commands

## Architecture

### Core Concepts
- **Template-based Configuration**: Predefined templates for different development scenarios (frontend, backend, ML, etc.)
- **Multi-tool Support**: Unified configuration management for Claude, Gemini, VS Code
- **Secure Authentication**: API key and credential management with encryption

### Project Structure
```
src/                    # Main source code (to be created)
├── commands/          # CLI command implementations
├── templates/         # Configuration templates
├── generators/        # Config file generators for each tool
├── auth/             # Authentication and credential management
└── utils/            # Shared utilities
```

### Key Implementation Phases
1. **Phase 1 (Current)**: Core CLI structure, config generators, template system
2. **Phase 2**: Tool-specific integrations (Claude, Gemini, VS Code)
3. **Phase 3**: Advanced features (GUI, plugins, team sharing)

## Important Design Decisions

- Use Commander.js for CLI command parsing
- Implement comprehensive error handling with clear user messages
- Follow TDD approach with unit and integration tests
- Support both interactive and non-interactive modes
- Store configurations in JSON format
- Use encryption for sensitive data (API keys)

## Development Focus Areas

When implementing features:
1. Start with the CLI command structure using Commander.js
2. Implement template loading and management first
3. Create config generators for each supported tool
4. Ensure proper error handling and user feedback
5. Write tests alongside implementation (TDD)

## References
- Design specification: `docs/design/base_design.md` (Japanese)
- Implementation TODOs: `docs/todos/` directory
- MCP Protocol documentation should be referenced for proper server configuration formats

## Development Process Notes

### Task Tracking
- When completing TDD cycle phases (RED, GREEN, REFACTOR), always update the corresponding task file in `docs/dev/phase-XX/` to mark completed items with [x]
- This helps track progress and ensures no steps are missed in the TDD process
- Example: After completing RED phase tests, update the checkbox in the task file from `- [ ]` to `- [x]`