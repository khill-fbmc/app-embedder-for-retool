export type SemVer = `${number}.${number}.${number}`;

export type UrlParam = {
  param: string;
  value: string;
};

export type RetoolApp = {
  name: string;
  public: boolean;
  env: "production" | "staging" | "development";
  version: SemVer | "latest";
  hash: UrlParam[];
  query: UrlParam[];
};
