import * as Monitor from "@zoomphant-utils/monitor";

const all_keys = [
  "account",
  "agent",
  "token",
  "instanceId",
  "resourceId",
  "domain",
];

const ZoomPhantMonitor = {
  settings: {
    account: "",
    agent: "",
    token: "",
    instanceId: "",
    resourceId: "",
    domain: "",
  },
  monitor: null,
};

window.addEventListener("DOMContentLoaded", () => {
  if (
    all_keys.reduce(
      (valid, key) => valid && !!ZoomPhantMonitor.settings[key],
      true
    )
  ) {
    ZoomPhantMonitor.monitor = new Monitor(window.ZoomPhantMonitorSDKSettings);
  }
});

export default ZoomPhantMonitor;
