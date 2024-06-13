const qs = new URLSearchParams(window.location.search);

const receiveMessage = (evt: MessageEvent) => {
  const data: {
    source: string;
    type: "logs" | "metrics";
    body: string;
    messageId: number;
  } = evt.data;

  const top = window.top;

  if (!top) return;

  if (evt.data.source === "zoomphant-monitor") {
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
      top.postMessage(
        {
          messageId: data.messageId,
          source: "zoomphant-connector",
          body: { error: xhr?.responseText },
          type: data.type
        },
        qs.get("domain") as string
      );
      xhr = null;
    };
    xhr.send(evt.data.body);
  }
};

const initialize = () => {
  window.addEventListener("message", receiveMessage);
};

export default function main() {
  window.document.addEventListener("DOMContentLoaded", initialize);
}
