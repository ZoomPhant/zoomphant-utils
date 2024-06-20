import type Core from "../core";
import type { IMessageParams } from "../types";
import { OriginalFetch } from "../utils";

export default class MonitorFetchPlugin {
  static initialize(core: Core) {
    if (!("fetch" in window)) return;

    async function FetchInterceptor(
      ...args: [
        url: string | Request | URL,
        init?: FetchRequestInit | undefined
      ]
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
          `${method} ${url} [${response.status}]`,
        ];
        if (body) {
          core.logs.capture([...params, { data: body }] as [
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

        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    window.fetch = FetchInterceptor as typeof OriginalFetch;
  }
}
