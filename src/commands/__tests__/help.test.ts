import { execSync } from 'child_process';
import { join } from 'path';

const CLI_PATH = join(__dirname, '../../index.ts');

describe('Help Command', () => {
  describe('--help flag', () => {
    it('should display help message when --help is used', () => {
      const output = execSync(`ts-node ${CLI_PATH} --help`, { encoding: 'utf8' });
      
      expect(output).toContain('Usage:');
      expect(output).toContain('mcp-env');
      expect(output).toContain('Options:');
      expect(output).toContain('--help');
    });

    it('should display help message when -h is used', () => {
      const output = execSync(`ts-node ${CLI_PATH} -h`, { encoding: 'utf8' });
      
      expect(output).toContain('Usage:');
      expect(output).toContain('mcp-env');
      expect(output).toContain('Options:');
      expect(output).toContain('--help');
    });
  });

  describe('subcommand descriptions', () => {
    it('should include descriptions for all main subcommands', () => {
      const output = execSync(`ts-node ${CLI_PATH} --help`, { encoding: 'utf8' });
      
      expect(output).toContain('init');
      expect(output).toContain('add');
      expect(output).toContain('sync');
      expect(output).toContain('auth');
      expect(output).toContain('template');
    });

    it('should include meaningful descriptions for each command', () => {
      const output = execSync(`ts-node ${CLI_PATH} --help`, { encoding: 'utf8' });
      
      expect(output).toMatch(/init.*initialize.*setup/i);
      expect(output).toMatch(/add.*server/i);
      expect(output).toMatch(/sync.*configuration/i);
      expect(output).toMatch(/auth.*authentication/i);
      expect(output).toMatch(/template.*manage.*template/i);
    });
  });

  describe('subcommand help', () => {
    it('should support help for init subcommand', () => {
      expect(() => {
        execSync(`ts-node ${CLI_PATH} init --help`, { encoding: 'utf8' });
      }).not.toThrow();
    });

    it('should support help for add subcommand', () => {
      expect(() => {
        execSync(`ts-node ${CLI_PATH} add --help`, { encoding: 'utf8' });
      }).not.toThrow();
    });

    it('should support help for sync subcommand', () => {
      expect(() => {
        execSync(`ts-node ${CLI_PATH} sync --help`, { encoding: 'utf8' });
      }).not.toThrow();
    });
  });

  describe('usage examples', () => {
    it('should include usage examples in help output', () => {
      const output = execSync(`ts-node ${CLI_PATH} --help`, { encoding: 'utf8' });
      
      expect(output).toMatch(/example/i);
      expect(output).toContain('mcp-env init');
      expect(output).toContain('mcp-env add');
    });
  });
});