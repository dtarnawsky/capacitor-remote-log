import { registerPlugin } from '@capacitor/core';
const CapacitorRemoteLogger = registerPlugin('CapacitorRemoteLogger', {
  web: () => import('./web').then(m => new m.RemoteLoggerWeb()),
});
export * from './definitions';
export { CapacitorRemoteLogger };
//# sourceMappingURL=index.js.map
