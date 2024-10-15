import { default as Monitor } from "@zoomphant-utils/monitor";

const all_keys = [
  "account",
  "agent",
  "token",
  "instanceId",
  "resourceId",
  "domain",
];

const ZoomPhantMonitor = {
  settings: window.ZoomPhantMonitorSettings
    ? window.ZoomPhantMonitorSettings
    : {},
  monitor: null,
};

window.addEventListener("DOMContentLoaded", () => {
  if (
    all_keys.reduce(
      (valid, key) => valid && !!ZoomPhantMonitor.settings[key],
      true
    )
  ) {
    ZoomPhantMonitor.monitor = new Monitor({
      ...ZoomPhantMonitor.settings,
      plugins: {
        console: true,
        fetch: true,
        xhr: true,
      },
    });
  }
});

export default ZoomPhantMonitor;
