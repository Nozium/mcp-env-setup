import { Command } from 'commander';
import { createProgram } from '../../cli';

describe('CLI Help Configuration', () => {
  let program: Command;

  beforeEach(() => {
    program = createProgram();
  });

  describe('Program configuration', () => {
    it('should have the correct name', () => {
      expect(program.name()).toBe('mcp-env');
    });

    it('should have the correct description', () => {
      expect(program.description()).toBe('A CLI tool for managing MCP (Model Context Protocol) environments');
    });

    it('should have the correct usage pattern', () => {
      expect(program.usage()).toBe('[command] [options]');
    });
  });

  describe('Available commands', () => {
    it('should have init command', () => {
      const initCommand = program.commands.find(cmd => cmd.name() === 'init');
      expect(initCommand).toBeDefined();
      expect(initCommand?.description()).toBe('Initialize a new mcp-env project');
    });

    it('should have add command', () => {
      const addCommand = program.commands.find(cmd => cmd.name() === 'add');
      expect(addCommand).toBeDefined();
      expect(addCommand?.description()).toBe('Add a new service to the project');
    });

    it('should have sync command', () => {
      const syncCommand = program.commands.find(cmd => cmd.name() === 'sync');
      expect(syncCommand).toBeDefined();
      expect(syncCommand?.description()).toBe('Sync the project with the cloud environments');
    });

    it('should have auth command', () => {
      const authCommand = program.commands.find(cmd => cmd.name() === 'auth');
      expect(authCommand).toBeDefined();
      expect(authCommand?.description()).toBe('Manage authentication with cloud providers');
    });

    it('should have template command', () => {
      const templateCommand = program.commands.find(cmd => cmd.name() === 'template');
      expect(templateCommand).toBeDefined();
      expect(templateCommand?.description()).toBe('Manage project templates');
    });
  });

  describe('Help output structure', () => {
    it('should generate help text with all required sections', () => {
      const helpText = program.helpInformation();
      
      // Check for main sections
      expect(helpText).toContain('Usage:');
      expect(helpText).toContain('Options:');
      expect(helpText).toContain('Commands:');
      
      // Check for all commands in help
      expect(helpText).toContain('init');
      expect(helpText).toContain('add');
      expect(helpText).toContain('sync');
      expect(helpText).toContain('auth');
      expect(helpText).toContain('template');
    });
  });

  describe('Subcommand help', () => {
    it('should display help for init command', () => {
      const initCommand = program.commands.find(cmd => cmd.name() === 'init');
      expect(initCommand).toBeDefined();
      
      const helpText = initCommand!.helpInformation();
      expect(helpText).toContain('Usage:');
      expect(helpText).toContain('init');
    });

    it('should display help for add command', () => {
      const addCommand = program.commands.find(cmd => cmd.name() === 'add');
      expect(addCommand).toBeDefined();
      
      const helpText = addCommand!.helpInformation();
      expect(helpText).toContain('Usage:');
      expect(helpText).toContain('add');
    });

    it('should display help for sync command', () => {
      const syncCommand = program.commands.find(cmd => cmd.name() === 'sync');
      expect(syncCommand).toBeDefined();
      
      const helpText = syncCommand!.helpInformation();
      expect(helpText).toContain('Usage:');
      expect(helpText).toContain('sync');
    });
  });
});