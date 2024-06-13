/// <reference types="vite/client" />
import { Core } from "@zoomphant-utils/monitor";

declare global {
  interface Window {
    instance: Core;
  }
}
