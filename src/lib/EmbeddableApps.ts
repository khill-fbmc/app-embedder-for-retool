import type { RetoolApp } from "@/types";

export const INSPECTOR_APP: RetoolApp = {
  name: "app-embedder-for-retool-inspector",
  public: true,
  version: "latest",
  env: "production",
  hash: [{ index: 1, param: "example", value: "current" }],
  query: [{ index: 1, param: "user", value: "kevin.hill" }],
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
      { index: 1, param: "taco", value: "bell" },
      { index: 2, param: "bean", value: "burrito" },
    ],
    query: [],
  },
  {
    name: "another-app-3",
    public: false,
    version: "1.2.3",
    env: "staging",
    hash: [{ index: 1, param: "super", value: "duper" }],
    query: [{ index: 1, param: "foo", value: "bar" }],
  },
];
