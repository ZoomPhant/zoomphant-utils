import type Core from "..";
import { detectOS, getBrowserInfo } from "../../utils";

export class Metrics {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  public record() {
    const { name: browser } = getBrowserInfo();
    this.core.post({
      type: "metrics",
      body: JSON.stringify({
        browser,
        title: document.title,
        os: detectOS(),
        instance: this.core.baseSettings?.instanceId,
      }),
    });
  }
}
