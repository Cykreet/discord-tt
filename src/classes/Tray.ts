import { app, Menu, shell, Tray as ElectronTray } from "electron";
import { join } from "path";
import client from "../client";

export default class Tray {
  tray: ElectronTray;

  constructor() {
    this.tray = new ElectronTray(join(__dirname, "../../assets/icon.png"));
    this.tray.setToolTip(app.name);
    this.tray.setTitle(app.name);

    this.tray.setIgnoreDoubleClickEvents(true);
    // todo: only triggers once
    this.tray.on("right-click", () => this.update());
  }

  private update() {
    console.log("updating");
    const menu = Menu.buildFromTemplate([
      {
        label: `${app.name} v${app.getVersion()}`,
        enabled: false,
      },
      {
        label:
          client.user == undefined
            ? "Connecting..."
            : `${client.user.username}#${client.user.discriminator}`,
        enabled: false,
      },
      {
        type: "separator",
      },
      {
        label: "GitHub",
        click: () => shell.openExternal("https://github.com/cykreet/treecord"),
      },
      {
        type: "separator",
      },
      {
        label: "Terminate",
        role: "quit",
      },
    ]);

    this.tray.setContextMenu(menu);
  }
}
