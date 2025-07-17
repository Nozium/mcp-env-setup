#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';
import { HELP_MESSAGES } from './commands/help';

const program = new Command();

program
  .name('mcp-env')
  .description(HELP_MESSAGES.main.description)
  .version(version, '-v, --version', 'output the current version');

// Add subcommands
program
  .command('init')
  .description(HELP_MESSAGES.commands.init)
  .action(() => {
    console.log('Init command - not yet implemented');
  });

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

// Override help to include examples
program.on('--help', () => {
  console.log('\nExamples:');
  HELP_MESSAGES.main.examples.forEach(example => {
    console.log(`  ${example}`);
  });
});

program.parse(process.argv);
