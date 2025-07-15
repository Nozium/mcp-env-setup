import { Command } from 'commander';

export interface AddCommandOptions {
  // Future options will be added here
}

export function createAddCommand(): Command {
  const addCommand = new Command('add');
  
  addCommand
    .description('Add a new MCP server configuration')
    .argument('<server>', 'Name of the MCP server to add')
    .action((serverName: string, options: AddCommandOptions) => {
      if (!serverName || serverName.trim() === '') {
        console.error('Error: Server name is required');
        process.exit(1);
      }
      
      console.log(`Adding MCP server: ${serverName}`);
      // TODO: Implement actual server addition logic
    });
    
  return addCommand;
}