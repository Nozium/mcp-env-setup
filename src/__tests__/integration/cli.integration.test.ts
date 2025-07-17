import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

// Integration tests - these test the actual CLI execution
describe('CLI Integration Tests', () => {
  const cliPath = path.join(__dirname, '../../index.ts');
  
  // These tests are intentionally slower as they test the full CLI
  describe('Help command execution', () => {
    it('should display help with --help flag', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} --help`);
      
      // Verify the actual output contains expected elements
      expect(stdout).toMatch(/Usage:/);
      expect(stdout).toMatch(/Options:/);
      expect(stdout).toMatch(/Commands:/);
    }, 10000); // Allow 10 seconds for integration test

    it('should display help with -h flag', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} -h`);
      
      expect(stdout).toMatch(/Usage:/);
    }, 10000);
  });

  describe('Version command execution', () => {
    it('should display version with --version flag', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} --version`);
      
      // Should output a version number
      expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/);
    }, 10000);
  });

  describe('Subcommand help execution', () => {
    it('should display help for init command', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} init --help`);
      
      expect(stdout).toMatch(/Usage:.*init/);
      expect(stdout).toContain('Initialize a new mcp-env project');
    }, 10000);

    it('should display help for add command', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} add --help`);
      
      expect(stdout).toMatch(/Usage:.*add/);
      expect(stdout).toContain('Add a new service to the project');
    }, 10000);

    it('should display help for sync command', async () => {
      const { stdout } = await execAsync(`npx ts-node ${cliPath} sync --help`);
      
      expect(stdout).toMatch(/Usage:.*sync/);
      expect(stdout).toContain('Sync the project with the cloud environments');
    }, 10000);
  });
});