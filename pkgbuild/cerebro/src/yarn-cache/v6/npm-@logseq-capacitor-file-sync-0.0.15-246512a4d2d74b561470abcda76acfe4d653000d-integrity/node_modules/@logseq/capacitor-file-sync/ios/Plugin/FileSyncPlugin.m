#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FileSyncPlugin, "FileSync",
           CAP_PLUGIN_METHOD(setEnv, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(keygen, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getLocalFilesMeta, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getLocalAllFilesMeta, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(renameLocalFile, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteLocalFiles, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateLocalFiles, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteRemoteFiles, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateRemoteFiles, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(encryptFnames, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(decryptFnames, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(decryptWithPassphrase, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(encryptWithPassphrase, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateLocalVersionFiles, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(cancelAllRequests, CAPPluginReturnPromise);
)
