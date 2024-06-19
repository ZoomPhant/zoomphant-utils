import Monitor from "@zoomphant-utils/monitor";

function main() {
  window.instance = new Monitor({
    account: "ca1",
    agent: "mc12N0C92NAWSAL",
    token: "domvczqwv18h",
    instanceId: "mi62",
    domain: "http://gate.zervice.cn:1080",
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
