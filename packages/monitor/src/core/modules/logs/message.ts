import type { IMessageParams } from "../../../types";
import { detectOS, getBrowserInfo, hashCode } from "../../../utils";

export class Message {
  public type: IMessageParams["type"] | null;

  public level: IMessageParams["level"] | null;

  public message: IMessageParams["message"] | null;

  public timestamp: IMessageParams["timestamp"] | null;

  public extra: IMessageParams["extra"] | null;

  public builtInExtra: {
    url?: string;
    os?: string;
    browser?: string;
    browserVersion?: string;
    title?: string;
  } | null;

  constructor(
    type: IMessageParams["type"],
    level: IMessageParams["level"],
    message: IMessageParams["message"],
    extra: IMessageParams["extra"]
  ) {
    this.level = level;
    this.message = message;
    this.type = type;
    this.timestamp = new Date().getTime();
    this.extra = (extra || {}) as IMessageParams["extra"];
    this.extra.hash = this.extra.hash || hashCode(message);
    this.builtInExtra = {};

    this.generateExtra();
  }

  generateExtra() {
    this.timestamp = new Date().getTime();
    const { name, version } = getBrowserInfo();
    const builtInExtra = {} as IMessageParams["extra"];

    builtInExtra.url = window.location.href;
    builtInExtra.os = detectOS();
    builtInExtra.browser = name;
    builtInExtra.browserVersion = version;
    builtInExtra.title = document.title;

    this.builtInExtra = builtInExtra;
  }

  destroy() {
    this.message = null;
    this.type = null;
    this.timestamp = null;
    this.extra = null;
    this.builtInExtra = null;
  }
}
