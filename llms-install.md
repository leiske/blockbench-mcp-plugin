# Blockbench MCP Installation

This file helps AI assistants configure the Blockbench MCP server connection.

## Prerequisites

Before configuring the MCP connection, please confirm:

1. **Is Blockbench running?**
   - The Blockbench desktop application must be open
   - The MCP plugin must be installed (File > Plugins > Load from URL: `https://jasonjgardner.github.io/blockbench-mcp-plugin/mcp.js`)

2. **What are your server settings?**
   - Default: `http://127.0.0.1:3000/bb-mcp`
   - If the port number and endpoint are something other than the default values (`:3000/bb-mcp`), please specify
   - Settings can be changed in Blockbench: Settings > General > MCP Server Port / MCP Server Endpoint / MCP Server Loopback Only

## Configuration

Once confirmed, add the MCP server to your client:

### Cline

Add to `cline_mcp_settings.json`:
```json
{
  "mcpServers": {
    "blockbench": {
      "url": "http://127.0.0.1:{PORT}/{ENDPOINT}",
      "type": "streamableHttp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### VS Code

Create `.vscode/mcp.json`:
```json
{
  "servers": {
    "blockbench": {
      "url": "http://127.0.0.1:{PORT}/{ENDPOINT}",
      "type": "http"
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "blockbench": {
      "command": "npx",
      "args": ["mcp-remote", "http://127.0.0.1:{PORT}/{ENDPOINT}"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add blockbench --transport http http://127.0.0.1:{PORT}/{ENDPOINT}
```

### Antigravity

```json
{
  "mcpServers": {
    "blockbench": {
      "serverUrl": "http://127.0.0.1:{PORT}/{ENDPOINT}"
    }
  }
}
```

Replace `{PORT}` with the port number (default: `3000`) and `{ENDPOINT}` with the endpoint path (default: `bb-mcp`).
