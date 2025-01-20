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
  debug: false,
};
console.log("[monitor-sdk]: Add initialize function on DOMContentLoaded event");
window.addEventListener("DOMContentLoaded", () => {
  console.log(
    "[monitor-sdk]: DOMContentLoaded is triggered, start to initialize"
  );
  const missing = all_keys.reduce((acc, key) => {
    if (!ZoomPhantMonitor.settings[key]) return [...acc, key];
    return acc;
  }, []);
  if (missing.length === 0) {
    ZoomPhantMonitor.monitor = new Monitor({
      ...ZoomPhantMonitor.settings,
      debug: !!ZoomPhantMonitor.debug,
      plugins: {
        console: true,
        fetch: true,
        xhr: true,
      },
    });

    console.log(`[monitor-sdk]: Initialize successfully`);
  } else {
    console.log(
      `[monitor-sdk]: Missing some variables [${missing.join(
        ","
      )}], please check ZoomPhantMonitorSettings`
    );
  }
});

export default ZoomPhantMonitor;
