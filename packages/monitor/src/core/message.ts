import type { IMessageParams } from "../types";
import { detectOS, getBrowserInfo } from "../utils";

export class Message {
  public type: IMessageParams["type"] | null;

  public level: IMessageParams["level"] | null;

  public message: IMessageParams["message"] | null;

  public timestamp: IMessageParams["timestamp"] | null;

  public extra: IMessageParams["extra"] | null;

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

    this.generateExtra();
  }

  generateExtra() {
    this.timestamp = new Date().getTime();
    const { name, version } = getBrowserInfo();
    const extra = this.extra || {} as IMessageParams["extra"];

    extra.url = window.location.href;
    extra.os = detectOS();
    extra.browser = name;
    extra.browserVersion = version;
    extra.title = document.title;

    this.extra = extra;
  }

  destroy() {
    this.message = null;
    this.type = null;
    this.timestamp = null;
    this.extra = null;
  }
}
