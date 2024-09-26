import type Core from "../core";
import type { IMessageParams } from "../types";
import { OriginalFetch } from "../utils";

export default class MonitorFetchPlugin {
  static initialize(core: Core) {
    if (!("fetch" in window)) return;

    async function FetchInterceptor(
      ...args: [url: string | Request | URL, init?: RequestInit | undefined]
    ) {
      const [
        url,
        { method = "GET", body } = {} as { method: string; body: any },
      ] = args;
      try {
        const response = await OriginalFetch.apply(this, args);
        const params = [
          "fetch",
          "info",
          url,
          {
            method,
            status: response.status,
            ...(body
              ? {
                  data: body,
                }
              : {}),
          },
        ];
        core.logs.capture(
          params as [
            IMessageParams["type"],
            IMessageParams["level"],
            IMessageParams["message"],
            IMessageParams["extra"]
          ]
        );

        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    window.fetch = FetchInterceptor as typeof OriginalFetch;
  }
}
