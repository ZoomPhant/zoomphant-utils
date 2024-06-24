import { version } from "../../package.json";
import MonitorConsolePlugin from "../plugins/console";
import MonitorFetchPlugin from "../plugins/fetch";
import MonitorXHRPlugin from "../plugins/xhr";
import type { IBaseSettings, IPluginSettings, ISettings } from "../types";
import { Logs } from "./modules/logs";
import { Metrics } from "./modules/metric";
class Core {
  public static readonly version: string = version;

  private connectorId: string = "zoomphant-connector";
  private monitorId: string = "zoomphant-monitor";

  public baseSettings: IBaseSettings | null = null;
  private pluginSettings: IPluginSettings = {
    xhr: false,
    fetch: false,
    console: false,
  };

  private connector: HTMLIFrameElement | null = null;
  private messageResolvers: Record<string, any> = {};
  private connectorPromise: Promise<any> | null = null;
  private connectorPromiseResolver:
    | ((value: PromiseLike<undefined> | undefined) => void)
    | null = null;

  public logs: Logs;
  public metrics: Metrics;

  constructor(settings: ISettings) {
    if (new.target !== Core)
      throw new Error("A static class cannot be instantiated.");
    if (!settings) throw new Error("Settings is required");

    this.baseSettings = {
      account: settings.account,
      agent: settings.agent,
      token: settings.token,
      domain: settings.domain,
      instanceId: settings.instanceId,
    };

    this.logs = new Logs(this, settings.maxStacks || 10);
    this.metrics = new Metrics(this);

    if (settings.plugins) {
      if (settings.plugins.xhr) this.pluginSettings.xhr = true;
      if (settings.plugins.fetch) this.pluginSettings.fetch = true;
      if (settings.plugins.console) this.pluginSettings.console = true;
    }

    this.initialize();
  }

  private initialize() {
    this.createConnector();
    this.addEventListeners();

    if (this.pluginSettings.fetch) MonitorFetchPlugin.initialize(this);
    if (this.pluginSettings.xhr) MonitorXHRPlugin.initialize(this);
    if (this.pluginSettings.console) MonitorConsolePlugin.initialize(this);

    this.metrics.record();
  }

  private createConnector() {
    this.connector = (document.getElementById(this.connectorId) ??
      document.createElement("iframe")) as HTMLIFrameElement;

    this.connector.id = this.connectorId;

    this.connector.src = `${
      this.baseSettings!.domain
    }/connector.html?${new URLSearchParams({
      ...(this.baseSettings || {}),
      domain: window.location.origin,
    })}`;

    this.connector.style.position = "absolute";
    this.connector.style.width = "0";
    this.connector.style.height = "0";
    this.connector.style.border = "none";
    this.connector.style.marginLeft = "-999px";

    this.connectorPromise = new Promise<undefined>((resolve) => {
      this.connectorPromiseResolver = resolve;
    });

    document.body.appendChild(this.connector);
  }

  private addEventListeners() {
    window.addEventListener("message", this.handleMessage.bind(this));
  }

  private handleMessage(evt: MessageEvent) {
    const { source, body, type, messageId } = evt.data;
    if (source === this.connectorId) {
      if (type === "initialize") {
        if (this.connectorPromiseResolver) {
          this.connectorPromiseResolver(undefined);
        }
      } else {
        const resolver = this.messageResolvers[messageId];
        if (resolver) {
          resolver(body);
          delete this.messageResolvers[messageId];
        }
      }
    }
  }

  public post<T = { error?: string }>({
    type,
    body,
  }: {
    type: "logs" | "metrics";
    body: string;
  }): Promise<T> {
    if (!this.connector) {
      throw new Error("Connector not found");
    }
    const messageId = crypto.randomUUID();
    const promise = new Promise<T>((resolve) => {
      this.messageResolvers[messageId] = resolve;
    });

    return Promise.resolve(
      this.connectorPromise?.then(() => {
        this.connector?.contentWindow?.postMessage?.(
          {
            source: this.monitorId,
            type,
            body,
            messageId,
          },
          this.baseSettings!.domain
        );
      })
    ).then(() => promise);
  }

  public destroy() {
    if (this.connector) {
      document.body.removeChild(this.connector);
      this.connector = null;
    }
  }
}

export default Core;
