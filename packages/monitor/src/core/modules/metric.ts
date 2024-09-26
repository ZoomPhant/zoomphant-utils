import type Core from "..";
import { detectOS, getBrowserInfo, getUnique } from "../../utils";

export class Metrics {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  public record() {
    setTimeout(() => {
      const { name: browser } = getBrowserInfo();
      this.core.post({
        type: "metrics",
        body: JSON.stringify({
          browser,
          title: document.title,
          os: detectOS(),
          unique: getUnique(),
          instance: this.core.baseSettings?.instanceId,
          resource: this.core.baseSettings?.resourceId,
        }),
      });
    }, 2000);
  }
}
