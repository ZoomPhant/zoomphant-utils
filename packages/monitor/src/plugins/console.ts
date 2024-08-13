import type Core from "../core";
import { OriginalConsole, safeJoin } from "../utils";
export default class MonitorConsolePlugin {
  static initialize(core: Core) {
    window.console.log = function (...args) {
      core.logs.capture(["console", "info", safeJoin(args, " ")]);
      OriginalConsole.log.call(OriginalConsole, ...args);
    };
    window.console.warn = function (...args) {
      core.logs.capture(["console", "warn", safeJoin(args, " ")]);
      OriginalConsole.warn.call(OriginalConsole, ...args);
    };
    window.console.error = function (...args) {
      core.logs.capture(["console", "error", safeJoin(args, " ")]);
      OriginalConsole.error.call(OriginalConsole, ...args);
    };
  }
}
