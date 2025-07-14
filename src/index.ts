#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';

const program = new Command();

program
  .version(version, '-v, --version', 'output the current version');

program.parse(process.argv);
