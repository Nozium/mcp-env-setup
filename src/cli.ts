import { Command } from 'commander';
import { version } from '../package.json';
import { t } from './constants/messages';
import { setupCommands } from './commands';

export function createProgram(): Command {
  const program = new Command();

  // Configure main program
  program
    .name(t.cli.name)
    .version(version, '-v, --version', t.cli.version.flag)
    .description(t.cli.description)
    .usage(t.cli.usage)
    .configureHelp({
      sortSubcommands: true,
      subcommandTerm: (cmd) => cmd.name() // Remove extra spacing in help
    });

  // Setup all commands
  setupCommands(program);

  return program;
}