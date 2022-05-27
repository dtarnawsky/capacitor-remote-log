"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var core = require("@capacitor/core");

const RemoteLogger$1 = core.registerPlugin("RemoteLogger", {
  web: () =>
    Promise.resolve()
      .then(function () {
        return web;
      })
      .then((m) => new m.RemoteLoggerWeb()),
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
class RemoteLoggerWeb extends core.WebPlugin {
  constructor() {
    super();
    this.hostName = "localhost";
    this.port = 8942;
    this.pending = undefined;
    if (RemoteLoggerWeb.that === undefined) {
      RemoteLoggerWeb.that = this;
      RemoteLoggerWeb.privateLog = window.console.log;
      RemoteLoggerWeb.privateWarn = window.console.warn;
      RemoteLoggerWeb.privateError = window.console.error;
      RemoteLoggerWeb.privateInfo = window.console.info;
      window.console.log = this.log;
      window.console.warn = this.warn;
      window.console.error = this.error;
      window.console.info = this.info;
    }
    this.notifyListeners("logStatusChange", {
      code: "code",
      message: "RemoteLogger Started.",
    });
  }
  write(ob) {
    switch (ob.level) {
      case "warn":
        this.warn(ob.message);
        break;
      case "error":
        this.error(ob.message);
        break;
      case "info":
        this.info(ob.message);
        break;
      default:
        this.log(ob.message);
    }
    return Promise.resolve();
  }
  log(message, ...args) {
    RemoteLoggerWeb.privateLog.call(this, message, ...args);
    RemoteLoggerWeb.that.push(message, args, "log");
  }
  warn(message, ...args) {
    RemoteLoggerWeb.privateWarn.call(this, message, ...args);
    RemoteLoggerWeb.that.push(message, args, "warn");
  }
  error(message, ...args) {
    RemoteLoggerWeb.privateError.call(this, message, ...args);
    RemoteLoggerWeb.that.push(message, args, "error");
  }
  info(message, ...args) {
    RemoteLoggerWeb.privateInfo.call(this, message, ...args);
    RemoteLoggerWeb.that.push(message, args, "info");
  }
  initialize(options) {
    let lastUrl;
    if (options === null || options === void 0 ? void 0 : options.hostName) {
      this.hostName = options.hostName;
    }
    if (options === null || options === void 0 ? void 0 : options.port) {
      this.port = options.port;
    }
    this.post("/devices", {
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
    return Promise.resolve();
  }
  async post(url, data) {
    const remoteHost = this.hostName + ":" + this.port;
    if (!data) {
      return Promise.resolve();
    }
    const remoteUrl = `http://${remoteHost}${url}`;
    try {
      //@ts-ignore
      const response = await fetch(remoteUrl, {
        method: "post",
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      // Logging should cause failures
      RemoteLoggerWeb.privateLog.call(
        this,
        `Failed to post to ${remoteUrl}`,
        data
      );
    }
  }
  //@ts-ignore
  push(message, _arguments, level) {
    const args = Array.prototype.slice.call(_arguments);
    let msg = message;
    args.forEach((element) => {
      if (msg !== "") {
        msg += " ";
      }
      if (typeof element == "object") {
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
        this.post("/log", this.pending);
        this.pending = undefined;
      }, 500);
      this.pending = [];
    }
    this.pending.push({
      id: this.getDeviceIdentifier(),
      message: msg,
      level,
      stack: undefined,
    }); // this.getStack() });
  }
  getDeviceIdentifier() {
    if (this.deviceIdentifier) {
      return this.deviceIdentifier.toString();
    }
    const tmp = localStorage.IonicLoggerDeviceId;
    let id = parseInt(tmp, 10);
    if (tmp == null || isNaN(id)) {
      // Create a random device identifier
      id = Math.floor(Math.random() * 999999999);
      localStorage.IonicLoggerDeviceId = id;
    }
    this.deviceIdentifier = id.toString();
    return id.toString();
  }
}
const RemoteLogger = new RemoteLoggerWeb();

var web = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  RemoteLoggerWeb: RemoteLoggerWeb,
  RemoteLogger: RemoteLogger,
});

exports.RemoteLogger = RemoteLogger$1;
//# sourceMappingURL=plugin.cjs.js.map
