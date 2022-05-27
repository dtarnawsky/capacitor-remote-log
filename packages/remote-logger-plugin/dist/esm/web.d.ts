import { WebPlugin } from '@capacitor/core';

import type {
  Options,
  CapacitorRemoteLoggerPlugin,
  LogMessage,
} from './definitions';

export declare class RemoteLoggerWeb
  extends WebPlugin
  implements CapacitorRemoteLoggerPlugin {
  private static that;
  private static privateLog;
  private static privateWarn;
  private static privateError;
  private static privateInfo;
  hostName: string;
  port: number;
  private deviceIdentifier;
  private pending;
  constructor();
  write(ob: LogMessage): Promise<void>;
  log(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  initialize(options: Options): Promise<void>;
  post(url: string, data: any): Promise<any>;
  private push;
  private getDeviceIdentifier;
}
declare const RemoteLogger: RemoteLoggerWeb;
export { RemoteLogger };
