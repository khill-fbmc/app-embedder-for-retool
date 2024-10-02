export type SemVer = `${number}.${number}.${number}`;

export type AppVersion = SemVer | "latest";

export type AppEnvironment = "production" | "staging" | "development";

export type UrlParamSpec = {
  index: number;
  param: string;
  value: string;
};

export type RetoolApp = {
  name: string;
  public: boolean;
  env: AppEnvironment;
  version: AppVersion;
  hash: UrlParamSpec[];
  query: UrlParamSpec[];
};
