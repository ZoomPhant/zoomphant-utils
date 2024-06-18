import type Core from "..";
import type { IMessageParams } from "../../types";
import { Message } from "../message";
import { Stack } from "../stack";

export class Logs {
  private core: Core;

  private maxStacks: number = 10;
  private stacks: Array<Stack> = [];

  constructor(core: Core, maxStacks: number) {
    this.core = core;
    this.maxStacks = maxStacks;
    this.stacks = [new Stack({ max: this.maxStacks })];
  }

  public capture(message: Message | Array<unknown>) {
    if (this.core) {
      if (message instanceof Message) {
        const [stack] = this.stacks;
        stack.push(message);
      } else {
        const [stack] = this.stacks;
        const args = message as [
          IMessageParams["type"],
          IMessageParams["level"],
          IMessageParams["message"]
        ];
        stack.push(new Message(...args));
      }
    }
  }

  public captureAndSync(message: Message | Array<unknown>) {
    if (this.core) {
      this.capture(message);

      this.stacks.unshift(new Stack({ max: this.maxStacks }));
      let stack = this.stacks.pop();
      if (stack) {
        return this.core
          .post({
            type: "logs",
            body: stack.stringify(this.core.baseSettings!.instanceId),
          })
          .finally(() => {
            if (stack) {
              stack.destroy();
              stack = undefined;
            }
          });
      }
    }
    return Promise.resolve();
  }
}
