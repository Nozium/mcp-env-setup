import chalk from 'chalk';

export const logger = {
  info: (message: string) => console.log(chalk.blue(message)),
  success: (message: string) => console.log(chalk.green(message)),
  warning: (message: string) => console.log(chalk.yellow(message)),
  error: (message: string) => console.error(chalk.red(message)),
  
  // For command output
  command: (message: string) => console.log(chalk.cyan(message)),
  description: (message: string) => console.log(chalk.gray(message))
};