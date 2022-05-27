import { registerPlugin } from '@capacitor/core';
const RemoteLogger = registerPlugin('RemoteLogger', {
  web: () => import('./web').then(m => new m.RemoteLoggerWeb()),
});
export * from './definitions';
export { RemoteLogger };
//# sourceMappingURL=index.js.map
