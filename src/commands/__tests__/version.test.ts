import { exec } from 'child_process';
import { promisify } from 'util';
import { version } from '../../../package.json';

const execAsync = promisify(exec);

describe('CLI version command', () => {
  it('should return the correct version with --version', async () => {
    const { stdout } = await execAsync('ts-node src/index.ts --version');
    expect(stdout.trim()).toBe(version);
  });

  it('should return the correct version with -v', async () => {
    const { stdout } = await execAsync('ts-node src/index.ts -v');
    expect(stdout.trim()).toBe(version);
  });
});
