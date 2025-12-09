import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
jest.setTimeout(15000);

const CLI = 'npx ts-node src/index.ts';

describe('CLI add command', () => {
  it('should recognize the add command with server argument', async () => {
    const { stdout } = await execAsync(`${CLI} add example-server --help`);

    expect(stdout).toContain('add [options] <server>');
    expect(stdout).toContain('Endpoint URL of the MCP server');
  });

  it('should execute add command action without error', async () => {
    const { stdout } = await execAsync(
      `${CLI} add example-server --url http://localhost:8080`
    );

    expect(stdout).toContain('Adding MCP server: example-server');
    expect(stdout).toContain('Server URL: http://localhost:8080');
    expect(stdout).toContain('Add command executed successfully');
  });
});
