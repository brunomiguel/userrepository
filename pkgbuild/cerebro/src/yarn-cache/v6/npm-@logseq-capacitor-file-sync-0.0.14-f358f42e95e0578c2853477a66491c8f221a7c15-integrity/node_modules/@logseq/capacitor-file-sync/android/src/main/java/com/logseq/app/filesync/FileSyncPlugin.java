package com.logseq.app.filesync;

import android.net.Uri;
import android.util.Log;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.logseq.sync.FileMeta;
import com.logseq.sync.RSFileSync;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.json.JSONException;

@CapacitorPlugin(name = "FileSync")
public class FileSyncPlugin extends Plugin {

    // save instance, used in jni
    public static FileSyncPlugin mInstance = null;

    @Override
    public void load() {
        super.load();

        mInstance = this;
        Log.i("FileSync", "Android plugin loaded");
    }

    public static FileSyncPlugin getInstance() {
        return mInstance;
    }

    public void progressNotify(String graphUUID, String file, String type, long progress, long total) {
        long percent = progress * 100 / total;

        JSObject payload = new JSObject();
        payload.put("graphUUID", graphUUID);
        payload.put("file", file);
        payload.put("type", type);
        payload.put("progress", progress);
        payload.put("total", total);
        payload.put("percent", percent);
        Log.i("FileSync", "progress notification " + payload.toString());

        this.notifyListeners("progress", payload);
    }

    @PluginMethod
    public void keygen(PluginCall call) {
        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                String[] keyPairs = RSFileSync.keygen();
                JSObject data = new JSObject();
                data.put("secretKey", keyPairs[0]);
                data.put("publicKey", keyPairs[1]);
                call.resolve(data);
            }
        };
        runner.start();
    }

    @PluginMethod
    public void setEnv(PluginCall call) {
        String env = call.getString("env");
        String secretKey = call.getString("secretKey");
        String publicKey = call.getString("publicKey");
        String graphUUID = call.getString("graphUUID");

        if (env == null) {
            call.reject("required parameter: env");
            return;
        }
        long code = RSFileSync.setEnvironment(graphUUID, env, secretKey, publicKey);
        if (code != -1) {
            JSObject ret = new JSObject();
            ret.put("ok", true);
            call.resolve(ret);
        } else {
            call.reject("invalid setEnv call");
        }
    }

    @PluginMethod
    public void encryptFnames(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        List<String> filePaths = call.getArray("filePaths").toList();

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < filePaths.size(); i++) {
                    String filePath = filePaths.get(i);
                    filePaths.set(i, Uri.decode(filePath));
                }

                String[] raw;
                raw = RSFileSync.encryptFilenames(graphUUID, filePaths);
                if (raw != null) {
                    JSObject ret = new JSObject();
                    ret.put("value", JSArray.from(raw));
                    call.resolve(ret);
                }
            }
        };
        runner.start();
    }

    @PluginMethod
    public void decryptFnames(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        List<String> filePaths = call.getArray("filePaths").toList();

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                String[] raw;
                raw = RSFileSync.decryptFilenames(graphUUID, filePaths);
                for (int i = 0; i < raw.length; i++) {
                    raw[i] = Uri.encode(raw[i], "/");
                }
                if (raw != null) {
                    JSObject ret = new JSObject();
                    ret.put("value", JSArray.from(raw));
                    call.resolve(ret);
                }
            }
        };
        runner.start();
    }

    //@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    @PluginMethod
    public void getLocalFilesMeta(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");
        List<String> filePaths = call.getArray("filePaths").toList();

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < filePaths.size(); i++) {
                    String filePath = filePaths.get(i);
                    filePaths.set(i, Uri.decode(filePath));
                }

                FileMeta[] metas = RSFileSync.getLocalFilesMeta(graphUUID, basePath, filePaths);
                if (metas == null) {
                    call.reject(RSFileSync.getLastError());
                    return;
                }
                JSObject dict = new JSObject();
                for (FileMeta meta : metas) {
                    if (meta == null) {
                        continue;
                    }
                    Log.i("FileSync", "got meta " + meta.toString());
                    JSObject item = new JSObject();
                    item.put("md5", meta.md5);
                    item.put("size", meta.size);
                    item.put("encryptedFname", meta.encryptedFilename);

                    item.put("mtime", meta.mtime);
                    item.put("ctime", meta.ctime);
                    dict.put(Uri.encode(meta.filePath, "/"), item);
                }
                JSObject ret = new JSObject();
                ret.put("result", dict);
                call.resolve(ret);
            }
        };
        runner.start();
    }

    @PluginMethod
    public void getLocalAllFilesMeta(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                FileMeta[] metas = RSFileSync.getLocalAllFilesMeta(graphUUID, basePath);
                if (metas == null) {
                    call.reject(RSFileSync.getLastError());
                    return;
                }
                JSObject dict = new JSObject();
                for (FileMeta meta : metas) {
                    JSObject item = new JSObject();
                    item.put("md5", meta.md5);
                    item.put("size", meta.size);
                    item.put("encryptedFname", meta.encryptedFilename);

                    item.put("mtime", meta.mtime); // not used for now
                    dict.put(Uri.encode(meta.filePath, "/"), item);
                }
                JSObject ret = new JSObject();
                ret.put("result", dict);
                call.resolve(ret);
            }
        };
        runner.start();
    }

    @PluginMethod
    public void deleteLocalFiles(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");
        List<String> filePaths = call.getArray("filePaths").toList();
        for (int i = 0; i < filePaths.size(); i++) {
            filePaths.set(i, Uri.decode(filePaths.get(i)));
        }

        RSFileSync.deleteLocalFiles(graphUUID, basePath, filePaths);

        JSObject ret = new JSObject();
        ret.put("ok", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void updateLocalFiles(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");
        List<String> filePaths = call.getArray("filePaths").toList();
        String token = call.getString("token");

        for (int i = 0; i < filePaths.size(); i++) {
            filePaths.set(i, Uri.decode(filePaths.get(i)));
        }

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                long code = RSFileSync.updateLocalFiles(graphUUID, basePath, filePaths, token);
                if (code != -1) {
                    JSObject ret = new JSObject();
                    ret.put("ok", true);
                    call.resolve(ret);
                } else {
                    call.reject(RSFileSync.getLastError());
                }
            }
        };
        runner.start();
    }

    @PluginMethod
    public void updateLocalVersionFiles(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");
        List<String> filePaths = call.getArray("filePaths").toList();
        String token = call.getString("token");

        for (int i = 0; i < filePaths.size(); i++) {
            filePaths.set(i, Uri.decode(filePaths.get(i)));
        }

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                long code = RSFileSync.updateLocalVersionFiles(graphUUID, basePath, filePaths, token);
                if (code != -1) {
                    JSObject ret = new JSObject();
                    ret.put("ok", true);
                    call.resolve(ret);
                } else {
                    call.reject(RSFileSync.getLastError());
                }
            }
        };
        runner.start();
    }

    @PluginMethod
    public void deleteRemoteFiles(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        List<String> filePaths = call.getArray("filePaths").toList();
        String token = call.getString("token");
        long txid = call.getInt("txid").longValue();

        for (int i = 0; i < filePaths.size(); i++) {
            filePaths.set(i, Uri.decode(filePaths.get(i)));
        }

        call.setKeepAlive(true);
        Thread runner = new Thread() {
            @Override
            public void run() {
                long code = RSFileSync.deleteRemoteFiles(graphUUID, filePaths, token, txid);
                if (code != -1) {
                    JSObject ret = new JSObject();
                    ret.put("ok", true);
                    ret.put("txid", code);
                    call.resolve(ret);
                } else {
                    call.reject(RSFileSync.getLastError());
                }
            }
        };
        runner.start();
    }

    @PluginMethod
    public void updateRemoteFiles(PluginCall call) throws JSONException {
        String graphUUID = call.getString("graphUUID");
        String basePath = call.getString("basePath");
        List<String> filePaths = call.getArray("filePaths").toList();
        String token = call.getString("token");
        long txid = call.getInt("txid").longValue();
        // NOTE: fnameEncryption is ignored. since it's always on.

        for (int i = 0; i < filePaths.size(); i++) {
            filePaths.set(i, Uri.decode(filePaths.get(i)));
        }

        Thread runner = new Thread() {
            @Override
            public void run() {
                long code = RSFileSync.updateRemoteFiles(graphUUID, basePath, filePaths, token, txid);
                if (code != -1) {
                    JSObject ret = new JSObject();
                    ret.put("ok", true);
                    ret.put("txid", code);
                    call.resolve(ret);
                } else {
                    call.reject(RSFileSync.getLastError());
                }
            }
        };
        runner.start();
    }

    @PluginMethod
    public void encryptWithPassphrase(PluginCall call) {
        String passphrase = call.getString("passphrase");
        String content = call.getString("content");
        byte[] encrypted = RSFileSync.ageEncryptWithPassphrase(passphrase, content.getBytes(StandardCharsets.UTF_8));
        if (encrypted == null) {
            call.reject(RSFileSync.getLastError());
            return;
        }
        String data = new String(encrypted, StandardCharsets.UTF_8);
        JSObject ret = new JSObject();
        ret.put("data", data);
        call.resolve(ret);
    }

    @PluginMethod
    public void decryptWithPassphrase(PluginCall call) {
        String passphrase = call.getString("passphrase");
        String content = call.getString("content");
        byte[] encrypted = RSFileSync.ageDecryptWithPassphrase(passphrase, content.getBytes(StandardCharsets.UTF_8));
        if (encrypted == null) {
            call.reject(RSFileSync.getLastError());
            return;
        }
        String data = new String(encrypted, StandardCharsets.UTF_8);
        JSObject ret = new JSObject();
        ret.put("data", data);
        call.resolve(ret);
    }

    @PluginMethod
    public void cancelAllRequests(PluginCall call) {
        long code = RSFileSync.cancelAllRequests();
        if (code != 0) {
            call.reject(RSFileSync.getLastError());
            return;
        }

        JSObject ret = new JSObject();
        ret.put("ok", true);
        call.resolve(ret);
    }
}
