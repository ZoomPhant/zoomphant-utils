import type Core from "../core";
import { OriginalConsole } from "../utils";

export default class MonitorConsolePlugin {
  static initialize(core: Core) {
    window.console.log = function (...args) {
      core.logs.capture(["console", "info", args.join(" ")]);
      OriginalConsole.log.call(OriginalConsole, ...args);
    };
    window.console.warn = function (...args) {
      core.logs.capture(["console", "warn", args.join(" ")]);
      OriginalConsole.warn.call(OriginalConsole, ...args);
    };
    window.console.error = function (...args) {
      core.logs.capture(["console", "error", args.join(" ")]);
      OriginalConsole.error.call(OriginalConsole, ...args);
    };
  }
}
