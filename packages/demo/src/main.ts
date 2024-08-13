import Monitor from "@zoomphant-utils/monitor";

function main() {
  window.instance = new Monitor({
    account: "ca1",
    agent: "mc132E1NJHXZFYC",
    token: "dunt0wtdr4e9",
    instanceId: "miQZ",
    resourceId: "mr132E1NJHUFRF7",
    domain: "https://demo.zervice.cn",
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
