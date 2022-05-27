#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(RemoteLoggerPlugin, "RemoteLogger",
  CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(write, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(removeAllListeners, CAPPluginReturnNone);
)
