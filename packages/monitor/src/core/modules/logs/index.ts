import type Core from "../..";
import type { IMessageParams } from "../../../types";
import { Message } from "./message";
import { Stack } from "./stack";

export class Logs {
  private core: Core;

  private maxStacks: number = 10;
  private stacks: Array<Stack> = [];

  constructor(core: Core, maxStacks: number) {
    this.core = core;
    this.maxStacks = maxStacks;
    this.stacks = [new Stack({ max: this.maxStacks })];
  }

  public capture(
    message:
      | Message
      | [
          IMessageParams["type"],
          IMessageParams["level"],
          IMessageParams["message"]
        ]
      | [
          IMessageParams["type"],
          IMessageParams["level"],
          IMessageParams["message"],
          IMessageParams["extra"]
        ]
  ) {
    if (this.core) {
      if (message instanceof Message) {
        const [stack] = this.stacks;
        stack.push(message);
      } else {
        const [stack] = this.stacks;
        if (message.length === 4) {
          stack.push(new Message(...message));
        } else if (message.length === 3) {
          stack.push(new Message(...[...message, {}]));
        } else {
          throw Error("Invalid params");
        }
      }
    }
  }

  public captureAndSync(
    message:
      | Message
      | [
          IMessageParams["type"],
          IMessageParams["level"],
          IMessageParams["message"]
        ]
      | [
          IMessageParams["type"],
          IMessageParams["level"],
          IMessageParams["message"],
          IMessageParams["extra"]
        ]
  ) {
    if (this.core) {
      this.capture(message);

      this.stacks.unshift(new Stack({ max: this.maxStacks }));
      let stack = this.stacks.pop();
      if (stack) {
        return this.core
          .post({
            type: "logs",
            body: stack.stringify(this.core.baseSettings!),
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
