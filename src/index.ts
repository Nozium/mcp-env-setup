#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';
import { createInitCommand } from './commands/init';

const program = new Command();

program
  .version(version, '-v, --version', 'output the current version');

program.addCommand(createInitCommand());

program.parse(process.argv);
