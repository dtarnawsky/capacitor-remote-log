import type { PluginListenerHandle } from '@capacitor/core';

export interface RemoteLoggerPlugin {
    /**
     * Hostname of the remote logging service
     */
    hostName: string;

    /**
     * Port number of the remote logging service
     */
     port: number;


    /**
     * Log a message to the remote logging service
     */
    log(message: LogMessage): Promise<boolean>;

    /**
     * Initialize the plugin
     */
     initialize(): Promise<boolean>;

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
