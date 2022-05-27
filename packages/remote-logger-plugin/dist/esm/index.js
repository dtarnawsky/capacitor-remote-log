import { registerPlugin } from '@capacitor/core';
const CapacitorRemoteLogger = registerPlugin('CapacitorRemoteLogger', {
  web: () => import('./web').then(m => new m.RemoteLoggerWeb()),
  ios: () => import('./web').then(m => new m.RemoteLoggerWeb()),
  android: () => import('./web').then(m => new m.RemoteLoggerWeb()),
});
export * from './definitions';
export { CapacitorRemoteLogger };
//# sourceMappingURL=index.js.map
