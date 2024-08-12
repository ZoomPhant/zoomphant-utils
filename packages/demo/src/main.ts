import Monitor from "@zoomphant-utils/monitor";

function main() {
  window.instance = new Monitor({
    account: "ca1",
    agent: "mc1326RGP9NPLF2",
    token: "dukx8qdos45c",
    instanceId: "miQT",
    domain: "https://demo.zervice.cn",
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
