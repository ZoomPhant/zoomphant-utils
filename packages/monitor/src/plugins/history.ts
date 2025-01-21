import type Core from "../core";

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;

export default class MonitorHistoryPlugin {
  static initialize(core: Core) {
    window.history.pushState = function (args) {
      const [, title, url] = args
      core.metrics.record({ title, url, type: 'pushState' });
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (args) {
      const [, title, url] = args
      core.metrics.record({ title, url, type: 'replaceState' });
      return originalReplaceState.apply(this, args);
    };
  }
}
