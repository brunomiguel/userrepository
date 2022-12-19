package com.logseq.sync;

import java.util.List;

public class RSFileSync {
    static {
        System.loadLibrary("rsapi");
    }

    public static native String getLastError();

    public static native long cancelAllRequests();

    public static native String[] keygen();

    public static native long setEnvironment(String graphUUID, String env, String secretKey, String publicKey);

    public static native String[] encryptFilenames(String graphUUID, List<String> filenames);

    public static native String[] decryptFilenames(String graphUUID, List<String> encryptedFilenames);

    public static native FileMeta[] getLocalFilesMeta(String graphUUID, String basePath, List<String> filePaths);

    public static native FileMeta[] getLocalAllFilesMeta(String graphUUID, String basePath);

    public static native long renameLocalFile(String graphUUID, String basePath, String oldPath, String newPath);

    public static native void deleteLocalFiles(String graphUUID, String basePath, List<String> filePaths);

    public static native long updateLocalFiles(String graphUUID, String basePath, List<String> filePaths, String token);

    public static native long updateLocalVersionFiles(String graphUUID, String basePath, List<String> filePaths, String token);

    public static native long deleteRemoteFiles(String graphUUID, List<String> filePaths, String token, long txid);

    public static native long updateRemoteFiles(String graphUUID, String basePath, List<String> filePaths, String token, long txid);

    public static native byte[] ageDecryptWithPassphrase(String passphrase, byte[] buffer);

    public static native byte[] ageEncryptWithPassphrase(String passphrase, byte[] buffer);
}
