import { execSync } from 'child_process';
import { join } from 'path';

describe('mcp-env add command', () => {
  const CLI_PATH = join(__dirname, '../../index.ts');
  
  it('should recognize the add command', () => {
    expect(() => {
      execSync(`npx ts-node ${CLI_PATH} add --help`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
    }).not.toThrow();
  });

  it('should require a server name argument', () => {
    expect(() => {
      execSync(`npx ts-node ${CLI_PATH} add`, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
    }).toThrow();
  });

  it('should successfully execute with server name', () => {
    expect(() => {
      execSync(`npx ts-node ${CLI_PATH} add test-server`, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
    }).not.toThrow();
  });
});