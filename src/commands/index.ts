import { Command } from 'commander';
import { t } from '../constants/messages';
import { logger } from '../utils/logger';

export function setupCommands(program: Command): void {
  // Init command
  program
    .command(t.cli.commands.init.name)
    .description(t.cli.commands.init.description)
    .action(() => {
      logger.warning(t.cli.commands.init.notImplemented);
    });

  // Add command
  program
    .command(t.cli.commands.add.name)
    .description(t.cli.commands.add.description)
    .action(() => {
      logger.warning(t.cli.commands.add.notImplemented);
    });

  // Sync command
  program
    .command(t.cli.commands.sync.name)
    .description(t.cli.commands.sync.description)
    .action(() => {
      logger.warning(t.cli.commands.sync.notImplemented);
    });

  // Auth command
  program
    .command(t.cli.commands.auth.name)
    .description(t.cli.commands.auth.description)
    .action(() => {
      logger.warning(t.cli.commands.auth.notImplemented);
    });

  // Template command
  program
    .command(t.cli.commands.template.name)
    .description(t.cli.commands.template.description)
    .action(() => {
      logger.warning(t.cli.commands.template.notImplemented);
    });
}