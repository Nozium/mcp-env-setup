import { Command } from 'commander';
import { HELP_MESSAGES } from './help';

export interface InitOptions {
  template?: string;
  force?: boolean;
}

export function createInitCommand(): Command {
  return new Command('init')
    .description(HELP_MESSAGES.commands.init)
    .option('-t, --template <template>', 'specify configuration template')
    .option('-f, --force', 'overwrite existing configuration')
    .action((options: InitOptions) => {
      try {
        handleInit(options);
      } catch (error) {
        console.error('Error during initialization:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });
}

function handleInit(options: InitOptions): void {
  console.log('Initializing MCP environment...');
  
  if (options.template) {
    console.log(`Using template: ${options.template}`);
  }
  
  if (options.force) {
    console.log('Force mode enabled');
  }
  
  console.log('Init command executed successfully');
}