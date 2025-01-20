const qs = new URLSearchParams(window.location.search);

const log = (...args: any[]) => qs.get("debug") === "1" && console.log(...args);

const receiveMessage = (evt: MessageEvent) => {
  log("[Monitor Connector]: Get Post Message");
  const data: {
    source: string;
    type: "logs" | "metrics";
    body: string;
    messageId: number;
  } = evt.data;

  const top = window.top;

  if (!top) return;

  if (evt.data.source === "zoomphant-monitor") {
    log("[Monitor Connector]: Get Post Message", data);
    const api =
      data.type === "logs" ? "/api/data/web/logs" : "/api/data/web/metrics";

    let xhr: XMLHttpRequest | null = new window.XMLHttpRequest();
    xhr.open(
      "POST",
      `${api}?${new URLSearchParams({
        agentId: qs.get("agent") as string,
        token: qs.get("token") as string,
      }).toString()}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-account-id", qs.get("account") as string);
    xhr.onload = () => {
      log("[Monitor Connector][Success]: ", data);
      top.postMessage(
        {
          messageId: data.messageId,
          source: "zoomphant-connector",
          type: data.type,
          body: {},
        },
        qs.get("domain") as string
      );
      xhr = null;
    };
    xhr.onerror = () => {
      log("[Monitor Connector][Error]: ", xhr);
      top.postMessage(
        {
          messageId: data.messageId,
          source: "zoomphant-connector",
          body: { error: xhr?.responseText },
          type: data.type,
        },
        qs.get("domain") as string
      );
      xhr = null;
    };
    xhr.send(evt.data.body);
  }
};

const initialize = () => {
  const top = window.top;
  if (top) {
    window.addEventListener("message", receiveMessage);
    log("[Monitor Connector]: Send Connector Initialize Event");
    top.postMessage(
      {
        source: "zoomphant-connector",
        type: "initialize",
      },
      qs.get("domain") as string
    );
  }
};

export default function main() {
  window.document.addEventListener("DOMContentLoaded", initialize);
}
