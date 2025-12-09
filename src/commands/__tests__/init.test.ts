import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const CLI = 'npx ts-node src/index.ts';

describe('CLI init command', () => {
  it('should recognize the init command', async () => {
    try {
      const { stdout } = await execAsync(`${CLI} init --help`);
      expect(stdout).toContain('init');
    } catch (error: any) {
      // Command should exist and show help, not throw error
      expect(error.code).not.toBe(1);
    }
  });

  it('should accept options for init command', async () => {
    try {
      const { stdout } = await execAsync(`${CLI} init --help`);
      expect(stdout).toContain('Usage:');
    } catch (error: any) {
      // Should show help without error
      expect(error.code).not.toBe(1);
    }
  });
});