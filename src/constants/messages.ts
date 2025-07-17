export const messages = {
  en: {
    cli: {
      name: 'mcp-env',
      description: 'A CLI tool for managing MCP (Model Context Protocol) environments',
      usage: '[command] [options]',
      version: {
        flag: 'output the current version'
      },
      commands: {
        init: {
          name: 'init',
          description: 'Initialize a new mcp-env project',
          notImplemented: 'Init command not yet implemented'
        },
        add: {
          name: 'add',
          description: 'Add a new service to the project',
          notImplemented: 'Add command not yet implemented'
        },
        sync: {
          name: 'sync',
          description: 'Sync the project with the cloud environments',
          notImplemented: 'Sync command not yet implemented'
        },
        auth: {
          name: 'auth',
          description: 'Manage authentication with cloud providers',
          notImplemented: 'Auth command not yet implemented'
        },
        template: {
          name: 'template',
          description: 'Manage project templates',
          notImplemented: 'Template command not yet implemented'
        }
      }
    }
  }
};

// Default to English for now
export const t = messages.en;