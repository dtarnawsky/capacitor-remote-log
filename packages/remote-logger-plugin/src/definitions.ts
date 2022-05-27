import type { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorRemoteLoggerPlugin {
  /**
   * Hostname of the remote logging service
   */
  hostName: string;

  /**
   * Port number of the remote logging service
   */
  port: number;

  /**
   * Log a message (js object) to the remote logging service
   */
  write(message: object): Promise<void>;

  /**
   * Initialize the plugin
   */
  initialize(options: Options): Promise<void>;

  /**
   * Listens for status changes.
   */
  addListener(
    eventName: 'logStatusChange',
    listenerFunc: (status: LogStatus) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Removes all listeners
   */
  removeAllListeners(): Promise<void>;
}

export interface LogMessage {
  /**
   * Device identifier
   */
  id?: string;

  /**
   * Log Level
   */
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error';

  /**
   * Log Message
   */
  message: string;

  /**
   * Stack Trace
   */
  stack?: string;
}

export interface LogDevice {
  /**
   * Device Identifier
   */
  id: string;

  /**
   * User Agent
   */
  userAgent: string;

  /**
   * Title
   */
  title?: string;
}

export interface LogStatus {
  /**
   * Status Code
   */
  code: 'network' | 'error' | 'ok';

  /**
   * Message
   */
  message: string;
}

export interface Options {
  /**
   * Host name of the remote logging server
   */
  hostName: string;

  /**
   * Port number of the remote logging server
   */
  port: number;
}
