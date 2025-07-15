#!/usr/bin/env ts-node

import { Command } from 'commander';
import { version } from '../package.json';

const program = new Command();

program
  .version(version, '-v, --version', 'output the current version')
  .description('A CLI tool for managing cloud environments')
  .command('init', 'Initialize a new mcp-env project')
  .command('add', 'Add a new service to the project')
  .command('sync', 'Sync the project with the cloud environments')
  .command('auth', 'Manage authentication with cloud providers')
  .command('template', 'Manage project templates')
  .usage('<command> [options]');

program.parse(process.argv);
