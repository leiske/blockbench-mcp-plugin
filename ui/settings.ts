export const LOOPBACK_HOST = "127.0.0.1";
export const DEFAULT_LOOPBACK_ONLY = true;

const settings: Setting[] = [];

export function isLoopbackOnlyEnabled(): boolean {
  const value = Settings.get("mcp_loopback_only");
  return typeof value === "boolean" ? value : DEFAULT_LOOPBACK_ONLY;
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
      icon: "psychology",
    }),
    new Setting("mcp_port", {
      name: tl("mcp.settings.port_name"),
      description: tl("mcp.settings.port_desc"),
      type: "number",
      value: 3000,
      category,
      icon: "numbers",
    }),
    new Setting("mcp_endpoint", {
      name: tl("mcp.settings.endpoint_name"),
      description: tl("mcp.settings.endpoint_desc"),
      type: "text",
      value: "/bb-mcp",
      category,
      icon: "webhook",
    }),
    new Setting("mcp_loopback_only", {
      name: tl("mcp.settings.loopback_only_name"),
      description: tl("mcp.settings.loopback_only_desc"),
      type: "toggle",
      value: DEFAULT_LOOPBACK_ONLY,
      category,
      icon: "shield",
    })
  );
}

export function settingsTeardown() {
  settings.forEach((setting) => {
    setting.delete();
  });
}
