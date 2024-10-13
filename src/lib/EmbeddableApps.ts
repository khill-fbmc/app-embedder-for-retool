import type { RetoolApp } from "@/types/extension";

export const INSPECTOR_APP: RetoolApp = {
  name: "app-embedder-for-retool-inspector",
  public: true,
  version: "latest",
  env: "production",
  hash: [{ param: "example", value: "current" }],
  query: [{ param: "user", value: "kevin.hill" }],
};

export const DEMO_APPS: RetoolApp[] = [
  {
    name: "demo-app-1",
    public: false,
    version: "3.61.2",
    env: "development",
    hash: [],
    query: [],
  },
  {
    name: "fancy-thing-2",
    public: false,
    version: "latest",
    env: "production",
    hash: [
      { param: "taco", value: "bell" },
      { param: "bean", value: "burrito" },
    ],
    query: [],
  },
  {
    name: "another-app-3",
    public: false,
    version: "1.2.3",
    env: "staging",
    hash: [{ param: "super", value: "duper" }],
    query: [{ param: "foo", value: "bar" }],
  },
];
