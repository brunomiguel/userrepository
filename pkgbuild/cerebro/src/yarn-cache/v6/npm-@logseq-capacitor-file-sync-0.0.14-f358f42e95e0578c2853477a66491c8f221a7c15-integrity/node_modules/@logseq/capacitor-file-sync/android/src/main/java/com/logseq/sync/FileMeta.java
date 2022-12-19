package com.logseq.sync;

public class FileMeta {

    public String filePath;
    public long size;
    public long mtime; // modification time in millis
    public long ctime; // creation time in millis
    public String md5;
    public String encryptedFilename;

    public FileMeta(String filePath, long size, long mtime, long ctime, String md5) {
        this.filePath = filePath;
        this.size = size;
        this.mtime = mtime;
        this.ctime = ctime;
        this.md5 = md5;
        this.encryptedFilename = encryptedFilename;
    }

    public String toString() {
        return (
            "FileMeta{" +
            "size=" +
            size +
            ", mtime=" +
            mtime +
            ", ctime=" +
            ctime +
            ", md5='" +
            md5 +
            '\'' +
            ", encryptedFilename='" +
            encryptedFilename +
            '\'' +
            '}'
        );
    }
}
