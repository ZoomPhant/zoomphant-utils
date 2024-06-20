import type Core from "../core";
import type { IMessageParams } from "../types";
import { OriginalXHR } from "../utils";

export default class MonitorXHRPlugin {
  static initialize(core: Core) {
    const proxiedOpen = OriginalXHR.prototype.open;
    const proxiedSend = OriginalXHR.prototype.send;

    OriginalXHR.prototype.open = function (
      ...args: [
        method: string,
        url: string | URL,
        async: boolean,
        username?: string | null | undefined,
        password?: string | null | undefined
      ]
    ) {
      const [method, url, async] = args;
      this.memo = {
        method: null,
        url: null,
        async: null,
      };
      this.memo.method = method;
      this.memo.url = url;
      this.memo.async = async;
      return proxiedOpen.apply(this, [...args]);
    } as typeof OriginalXHR.prototype.open;

    OriginalXHR.prototype.send = function (
      ...args: [body?: Document | XMLHttpRequestBodyInit | null | undefined]
    ) {
      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          const params = [
            "xhr",
            "info",
            `${this.memo.method} ${this.memo.url} [${this.status}]`,
          ];
          if (args.length > 0) {
            core.logs.capture([...params, { data: args[0] }] as [
              IMessageParams["type"],
              IMessageParams["level"],
              IMessageParams["message"],
              IMessageParams["extra"]
            ]);
          } else {
            core.logs.capture(
              params as [
                IMessageParams["type"],
                IMessageParams["level"],
                IMessageParams["message"]
              ]
            );
          }
        }
      });
      return proxiedSend.apply(this, [...args]);
    } as typeof OriginalXHR.prototype.send;
  }
}
