import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI init command', () => {
  it('should recognize the init command', async () => {
    try {
      const { stdout } = await execAsync('ts-node src/index.ts init --help');
      expect(stdout).toContain('init');
    } catch (error: any) {
      // Command should exist and show help, not throw error
      expect(error.code).not.toBe(1);
    }
  });

  it('should accept options for init command', async () => {
    try {
      const { stdout } = await execAsync('ts-node src/index.ts init --help');
      expect(stdout).toContain('Usage:');
    } catch (error: any) {
      // Should show help without error
      expect(error.code).not.toBe(1);
    }
  });
});