/**
 * Centralized help messages for the MCP Environment Setup Tool
 * This structure allows for easy localization and maintenance
 */
export const HELP_MESSAGES = {
  main: {
    description: 'MCP Environment Setup Tool - CLI utility for managing Model Context Protocol (MCP) server configurations across multiple AI development environments',
    usage: 'mcp-env [command] [options]',
    examples: [
      'mcp-env init                    # Initialize MCP configuration for your project',
      'mcp-env add server-name         # Add a new MCP server to configuration',
      'mcp-env sync                    # Sync configurations across Claude, Gemini, VS Code',
      'mcp-env auth store key-name     # Store authentication credentials securely',
      'mcp-env template list           # List available configuration templates'
    ]
  },
  
  commands: {
    init: 'Initialize MCP environment setup and configuration for your development setup',
    add: 'Add a new MCP server to the configuration with interactive setup',
    sync: 'Synchronize MCP configuration across different AI development tools',
    auth: 'Manage authentication credentials and API keys for MCP servers',
    template: 'Manage predefined MCP templates and apply them to projects'
  },

  // Future: Support for localized messages
  // locale: 'en' | 'ja'
};