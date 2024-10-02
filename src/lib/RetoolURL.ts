export function retoolAppToUrl() {
  //
}

export function retoolUrl(config: RetoolUrlConfig) {
  const url = new RetoolURL(config.domain);
  if (config?.app) url.app(config.app);
  if (config?.env) url.env(config.env);
  if (config?.version) url.version(config.version);
  if (config?.embed) url.embed(config.embed);
  if (config?.hideNav) url.hideNav(config.hideNav);
  if (config?.hideTimer) url.hideTimer(config.hideTimer);
  if (config?.historyOffset) url.historyOffset(config.historyOffset);
  return url;
}

export class RetoolURL {
  private _path = "";
  private _appId = "";
  private _domain: string;
  private _environment: Environment = "development";
  private _releaseVersion: RetoolVersion = "latest";
  private _embed!: boolean;
  private _hideNav!: boolean;
  private _hideTimer!: boolean;
  private _historyOffset?: number;

  get [Symbol.toStringTag]() {
    return "RetoolURL";
  }

  get raw() {
    return this.toString();
  }

  get base() {
    return `https://${this._domain}.retool.com/${this._path}/${this._appId}`;
  }

  constructor(domain: string) {
    this._domain = domain;
  }

  domain(domain: string) {
    this._domain = domain;
    return this;
  }

  app(appId: string) {
    this._path = "app";
    this._appId = appId;
    return this;
  }

  env(value: Environment) {
    this._environment = value;
    return this;
  }

  version(value: RetoolVersion) {
    this._releaseVersion = value;
    return this;
  }

  embed(value = true) {
    this._embed = value;
    return this;
  }

  hideNav(value = true) {
    this._hideNav = value;
    return this;
  }

  hideTimer(value = true) {
    this._hideTimer = value;
    return this;
  }

  historyOffset(value: number) {
    this._historyOffset = value;
    return this;
  }

  toString() {
    const url = new URL(this.base);
    const params = new URLSearchParams();

    params.set("_environment", this._environment);
    params.set("_releaseVersion", this._releaseVersion);
    if (this._embed) params.set("_embed", this._embed.toString());
    if (this._hideNav) params.set("_hideNav", this._hideNav.toString());
    if (this._hideTimer) params.set("_hideTimer", this._hideTimer.toString());

    if (this._historyOffset !== undefined) {
      params.set("_historyOffset", this._historyOffset.toString());
    }

    url.search = params.toString();
    return url.toString();
  }
}

export type Environment = "production" | "staging" | "development";

export type SemVer = `${number}.${number}.${number}`;

export type RetoolVersion = SemVer | "latest";

export type RetoolUrlConfig = {
  domain: string;
} & Partial<{
  app: string;
  env: Environment;
  version: RetoolVersion;
  embed: boolean;
  hideNav: boolean;
  hideTimer: boolean;
  historyOffset: number;
}>;
