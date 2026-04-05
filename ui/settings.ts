export const LOOPBACK_HOST = "127.0.0.1";
export const DEFAULT_LOOPBACK_ONLY = true;

const MCP_SETTING_IDS = [
  "mcp_instructions",
  "mcp_port",
  "mcp_endpoint",
  "mcp_loopback_only",
] as const;

const settings: Setting[] = [];

export function isLoopbackOnlyEnabled(): boolean {
  const value = Settings.get("mcp_loopback_only");
  return typeof value === "boolean" ? value : DEFAULT_LOOPBACK_ONLY;
}

function snapshotMcpSettings(): Record<string, string | number | boolean> {
  return Object.fromEntries(
    MCP_SETTING_IDS.map((id) => [id, Settings.get(id)])
      .filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
  );
}

export function settingsSetup() {
  const category = "general";

  settings.push(
    new Setting("mcp_instructions", {
      name: tl("mcp.settings.instructions_name"),
      // https://github.com/punkpeye/fastmcp?tab=readme-ov-file#providing-instructions
      description: tl("mcp.settings.instructions_desc"),
      type: "text",
      value:
        "Generate simple, low-poly models for Minecraft inside Blockbench.",
      category,
      requires_restart: true,
      icon: "psychology",
    }),
    new Setting("mcp_port", {
      name: tl("mcp.settings.port_name"),
      description: tl("mcp.settings.port_desc"),
      type: "number",
      value: 3000,
      category,
      requires_restart: true,
      icon: "numbers",
    }),
    new Setting("mcp_endpoint", {
      name: tl("mcp.settings.endpoint_name"),
      description: tl("mcp.settings.endpoint_desc"),
      type: "text",
      value: "/bb-mcp",
      category,
      requires_restart: true,
      icon: "webhook",
    }),
    new Setting("mcp_loopback_only", {
      name: tl("mcp.settings.loopback_only_name"),
      description: tl("mcp.settings.loopback_only_desc"),
      type: "toggle",
      value: DEFAULT_LOOPBACK_ONLY,
      category,
      requires_restart: true,
      icon: "shield",
    })
  );
}

export function settingsTeardown({ preserveValues = false }: { preserveValues?: boolean } = {}) {
  const preservedValues = preserveValues ? snapshotMcpSettings() : null;

  settings.forEach((setting) => {
    setting.delete();
  });
  settings.length = 0;

  if (preservedValues) {
    Object.assign(Settings.stored, preservedValues);
    Settings.saveLocalStorages();
  }
}
