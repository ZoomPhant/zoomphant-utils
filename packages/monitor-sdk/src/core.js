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

function initialize() {
  console.log("[Monitor SDK]: Initialize");
  const missing = all_keys.reduce((acc, key) => {
    if (!ZoomPhantMonitor.settings[key]) return [...acc, key];
    return acc;
  }, []);
  if (missing.length === 0) {
    ZoomPhantMonitor.monitor = new Monitor({
      ...ZoomPhantMonitor.settings,
      plugins: {
        console: ZoomPhantMonitor.settings?.plugins?.console ?? true,
        fetch: ZoomPhantMonitor.settings?.plugins?.fetch ?? true,
        xhr: ZoomPhantMonitor.settings?.plugins?.xhr ?? true,
        history: ZoomPhantMonitor.settings?.plugins?.history ?? true
      },
      debug: !!ZoomPhantMonitor.debug,
    });

    console.log(`[Monitor SDK]: Initialize successfully`);
  } else {
    console.log(
      `[Monitor SDK][Error]: Missing some variables [${missing.join(
        ","
      )}], please check ZoomPhantMonitorSettings`
    );
  }
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("[Monitor SDK]: Document is ready, initialize directly");
  setTimeout(() => initialize());
} else {
  console.log("[Monitor SDK]: Add initialize function on DOMContentLoaded event");
  window.addEventListener("DOMContentLoaded", () => {
    console.log("[Monitor SDK]: DOMContentLoaded has been triggered");
    initialize();
  });
}

export default ZoomPhantMonitor;
