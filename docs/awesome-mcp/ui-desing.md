# Design MCP
- Figma

# UI controlling mcp
## Common
- playwright
```bash 
# install for claude code
claude mcp add playwright npx @playwright/mcp@latest
```

### install for gemini cli
add mcp server config to .gemini/settings.json
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

## iOS
- mobile mcp
```bash
# install for claude code
claude mcp add mobile -- npx -y @mobilenext/mobile-mcp@latest

```

