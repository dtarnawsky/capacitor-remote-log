import { WebPlugin } from '@capacitor/core';
import { RemoteLogger } from '.';
import type { RemoteLoggerPlugin } from './definitions';

export class RemoteLoggerWeb extends WebPlugin {
    private static that;
    private static privateLog;
    private static privateWarn;
    private static privateError;
    private static privateInfo;
    public hostName = 'localhost';
    public port = 8942;




    private deviceIdentifier: string;
    private pending = undefined;

    constructor() {
        super();

        if (RemoteLoggerWeb.that === undefined) {
            RemoteLoggerWeb.that = this;

            RemoteLoggerWeb.privateLog = window.console.log;
            RemoteLoggerWeb.privateWarn = window.console.error;
            RemoteLoggerWeb.privateError = window.console.error;
            RemoteLoggerWeb.privateInfo = window.console.info;
            window.console.log = this.log;
            window.console.warn = this.warn;
            window.console.error = this.error;
            window.console.info = this.info;
        }


        this.notifyListeners('logStatusChange', { code: 'code', message: 'RemoteLogger Started.' });
    }

    public log(message, ...args) {
        RemoteLoggerWeb.privateLog.call(this, message, ...args);
        RemoteLoggerWeb.that.write(message, args, 'log');
    }

    public warn(message, ...args) {
        RemoteLoggerWeb.privateWarn.call(this, message, ...args);
        RemoteLoggerWeb.that.write(message, args, 'warn');
    }

    public error(message, ...args) {
        RemoteLoggerWeb.privateError.call(this, message, ...args);
        RemoteLoggerWeb.that.write(message, args, 'error');
    }

    public info(message, ...args) {
        RemoteLoggerWeb.privateInfo.call(this, message, ...args);
        RemoteLoggerWeb.that.write(message, args, 'info');
    }

    public initialize(): Promise<boolean> {
        let lastUrl: string;
        this.post('/devices', {
            id: this.getDeviceIdentifier(),
            userAgent: window.navigator.userAgent,
            title: window.document.title,
        });

        // Report urls
        setInterval(() => {
            if (document.location.href !== lastUrl) {
                lastUrl = document.location.href;
                this.log(`Url changed to ${lastUrl}`);
            }
        }, 1000);
        return Promise.resolve(true);
    }

    async post(url: string, data: any): Promise<any> {
        const remoteHost = this.hostName + ':' + this.port;
        if (!data) {
            return Promise.resolve();
        }
        const remoteUrl = `http://${remoteHost}${url}`;
        try {
            const response: Response = await fetch(remoteUrl, {
                method: 'post',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch {
            // Logging should cause failures
            RemoteLoggerWeb.privateLog.call(this, `Failed to post to ${remoteUrl}`, data);
        }
    }

    private write(message, _arguments, level) {
        const args = Array.prototype.slice.call(_arguments);
        let msg = message;
        args.forEach((element) => {
            if (msg !== '') {
                msg += ' ';
            }
            if (typeof element == 'object') {
                msg += JSON.stringify(element);
            } else {
                msg += element;
            }
        });
        // Commenting out for now. Stack is hard as it may be in the source map
        //const stack = this.getStack();

        if (!this.pending) {
            setTimeout(() => {
                // Push pending log entries. We wait around for 1 second to see how much accumulates
                this.post('/log', this.pending);
                this.pending = undefined;
            }, 500);
            this.pending = [];
        }
        this.pending.push({ id: this.getDeviceIdentifier(), message: msg, level, stack: undefined }); // this.getStack() });
    }

    private getDeviceIdentifier(): string {
        if (this.deviceIdentifier) {
            return this.deviceIdentifier.toString();
        }
        const tmp = localStorage.IonicLoggerDeviceId;
        let id: number = parseInt(tmp, 10);
        if (tmp == null || isNaN(id)) {
            // Create a random device identifier
            id = Math.floor(Math.random() * 999999999);
            localStorage.IonicLoggerDeviceId = id;
        }
        this.deviceIdentifier = id.toString();
        return id.toString();
    }
}
