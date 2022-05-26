import { registerPlugin } from '@capacitor/core';

import type { RemoteLoggerPlugin } from './definitions';

const RemoteLogger = registerPlugin<RemoteLoggerPlugin>(
  'RemoteLogger',
  {
    web: () => import('./web').then(m => new m.RemoteLoggerWeb()),
  }
);

export * from './definitions';
export { RemoteLogger };
