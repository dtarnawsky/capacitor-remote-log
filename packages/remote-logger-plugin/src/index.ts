import { registerPlugin } from "@capacitor/core";

import type { CapacitorRemoteLoggerPlugin } from "./definitions";

const RemoteLogger = registerPlugin<CapacitorRemoteLoggerPlugin>(
  "RemoteLogger",
  {
    web: () => import("./web").then((m) => new m.RemoteLoggerWeb()),
  }
);

export * from "./definitions";
export { RemoteLogger };
