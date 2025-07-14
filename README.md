# mcp-env-setup
mcp-env-setup tool for multi CLI environment

## Project Structure

```
src/
├── commands/      # CLI command implementations
├── templates/     # Configuration templates for different environments
├── generators/    # Configuration file generators for each tool
├── auth/          # Authentication and credential management
├── utils/         # Shared utilities and helper functions
└── index.ts       # Main entry point for the CLI application
```

### Directory Descriptions

- **commands/**: Contains the implementation of all CLI commands (init, add, sync, auth, template)
- **templates/**: Stores predefined configuration templates for various development scenarios (frontend, backend, ML, etc.)
- **generators/**: Houses tool-specific configuration generators for Claude Desktop/Code, Gemini CLI, and VS Code
- **auth/**: Manages secure storage and retrieval of API tokens and credentials
- **utils/**: Common utilities, error handling, logging, and shared functionality
