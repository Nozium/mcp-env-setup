#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';
import { createAddCommand } from './commands/add';

const program = new Command();

program
  .version(version, '-v, --version', 'output the current version');

// Register add command
program.addCommand(createAddCommand());

program.parse(process.argv);
