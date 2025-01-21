import type Core from "..";
import { detectOS, getBrowserInfo, getUnique } from "../../utils";

export class Metrics {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  public record(params?: {
    title: string | null | undefined;
    url: string | null | undefined;
    type: "replaceState" | "pushState" | "load";
  }) {
    setTimeout(() => {
      const { name: browser } = getBrowserInfo();
      this.core.post({
        type: "metrics",
        body: JSON.stringify({
          browser,
          title: params?.title && params.title !== '' ? params.title : document.title,
          type: params?.type ?? "load",
          path: params?.url ?? window.location.href,
          os: detectOS(),
          unique: getUnique(),
          instance: this.core.baseSettings?.instanceId,
          resource: this.core.baseSettings?.resourceId,
        }),
      });
    }, 2000);
  }
}
