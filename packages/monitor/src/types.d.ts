export type ISettings = IBaseSettings & {
  plugins?: IPluginSettings;
} & IStackSettings;

export type IBaseSettings = {
  account: string;
  agent: string;
  token: string;
  instanceId: string;
  resourceId: string;
  domain: string;
};

export type IPluginSettings = {
  xhr?: boolean;
  fetch?: boolean;
  console?: boolean;
};

export type IStackSettings = {
  maxStacks?: number;
};

export type IMessageParams = {
  level: "info" | "warn" | "error";

  type: "xhr" | "console" | "fetch" | "exception";

  message: string;

  timestamp: number;

  extra: {
    url?: string;
    os?: string;
    browser?: string;
    browserVersion?: string;
    title?: string;
    data?: string;
  };
};
