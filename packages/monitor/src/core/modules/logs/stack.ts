import type { IBaseSettings } from "../../../types";
import { JSONStringify, pick } from "../../../utils";
import type { Message } from "./message";

export class Stack {
  private list: Array<Message> | null;

  max;

  constructor({ max = 1 }) {
    this.max = max;
    this.list = [];
  }

  push(message: Message) {
    this.list = [...(this.list || []).slice(-1 * this.max + 1), message];
  }

  toNormalize(settings: IBaseSettings) {
    if (!this.list || this.list.length <= 0) return null;
    const last = this.list[this.list.length - 1];
    return {
      ...pick(last.extra || {}, ["browser", "url", "os", "title"]),
      level: last.level,
      instance: settings.instanceId,
      resource: settings.resourceId,
      stack: (this.list || [])
        .reduce<any[]>((acc, message) => {
          const { message: line, timestamp, type } = message;
          return [
            ...acc,
            (Array.isArray(line) ? line : [line]).map(
              (o) =>
                `[${type}] [${timestamp}] ${
                  typeof o === "string" ? o.trim() : JSONStringify(o)
                }`
            ),
          ];
        }, [])
        .reverse()
        .join("\n"),
    };
  }

  stringify(settings: IBaseSettings) {
    return JSON.stringify(this.toNormalize(settings));
  }

  destroy() {
    (this.list || []).forEach((o) => o.destroy());
    this.list = null;
  }
}
