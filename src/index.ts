#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';
import { createInitCommand } from './commands/init';
import { HELP_MESSAGES } from './commands/help';

const program = new Command();

program
  .name('mcp-env')
  .description(HELP_MESSAGES.main.description)
  .version(version, '-v, --version', 'output the current version');

// Add subcommands
program.addCommand(createInitCommand());

program
  .command('add')
  .description(HELP_MESSAGES.commands.add)
  .action(() => {
    console.log('Add command - not yet implemented');
  });

program
  .command('sync')
  .description(HELP_MESSAGES.commands.sync)
  .action(() => {
    console.log('Sync command - not yet implemented');
  });

program
  .command('auth')
  .description(HELP_MESSAGES.commands.auth)
  .action(() => {
    console.log('Auth command - not yet implemented');
  });

program
  .command('template')
  .description(HELP_MESSAGES.commands.template)
  .action(() => {
    console.log('Template command - not yet implemented');
  });

// Add custom help text
program.addHelpText('after', `
Examples:
${HELP_MESSAGES.main.examples.map(example => `  ${example}`).join('\n')}
`);

program.parse(process.argv);