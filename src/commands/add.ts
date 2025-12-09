import { Command } from 'commander';
import { HELP_MESSAGES } from './help';

export interface AddOptions {
  url?: string;
  type?: string;
  apiKey?: string;
}

export function createAddCommand(): Command {
  return new Command('add')
    .description(HELP_MESSAGES.commands.add)
    .argument('<server>', 'Name of the MCP server to add')
    .option('-u, --url <url>', 'Endpoint URL of the MCP server')
    .option('-t, --type <type>', 'Server type (e.g., local, remote)')
    .option('-k, --api-key <key>', 'API key or token for the server')
    .action((server: string, options: AddOptions) => {
      try {
        handleAdd(server, options);
      } catch (error) {
        console.error('Error during add operation:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });
}

function handleAdd(server: string, options: AddOptions): void {
  console.log(`Adding MCP server: ${server}`);

  if (options.url) {
    console.log(`Server URL: ${options.url}`);
  }

  if (options.type) {
    console.log(`Server type: ${options.type}`);
  }

  if (options.apiKey) {
    console.log('API key provided');
  }

  console.log('Add command executed successfully');
}
