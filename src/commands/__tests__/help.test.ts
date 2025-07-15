import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI help command', () => {
  it('should return a help message with --help', async () => {
    const { stdout } = await execAsync('ts-node src/index.ts --help');
    expect(stdout).toContain('Usage: index [options]');
  });
});
