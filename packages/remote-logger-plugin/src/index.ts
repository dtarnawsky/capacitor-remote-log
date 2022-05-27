import { registerPlugin } from '@capacitor/core';

import type { CapacitorRemoteLoggerPlugin } from './definitions';

const CapacitorRemoteLogger = registerPlugin<CapacitorRemoteLoggerPlugin>(
  'CapacitorRemoteLogger',
  {
    web: () => import('./web').then(m => new m.RemoteLoggerWeb()),
  },
);

export * from './definitions';
export { CapacitorRemoteLogger };
