export type ISettings = IBaseSettings & {
  plugins?: IPluginSettings;
};

export type IBaseSettings = {
  account: string;
  agent: string;
  token: string;
  domain: string;
};

export type IPluginSettings = {
  xhr: boolean;
  fetch: boolean;
  console: boolean;
};
