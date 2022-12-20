//
//  SyncClient.swift
//  Logseq
//
//  Created by Mono Wang on 4/8/R4.
//

import os
import Foundation
import AWSS3
import Alamofire

public protocol SyncDebugDelegate {
    func debugNotification(_ message: [String: Any])
}

public class SyncClient {
    private var token: String = ""
    private var graphUUID: String!
    private var txid: Int = 0
    private var s3prefix: String?

    public var delegate: SyncDebugDelegate?

    public init() {
    }

    public init(token: String) {
        self.token = token
    }

    public init(token: String, graphUUID: String) {
        self.token = token
        self.graphUUID = graphUUID
    }

    public init(token: String, graphUUID: String, txid: Int) {
        self.token = token
        self.graphUUID = graphUUID
        self.txid = txid
    }

    public func set(token: String, graphUUID: String, txid: Int) {
        self.token = token
        self.graphUUID = graphUUID
        self.txid = txid
    }

    public func set(token: String, graphUUID: String) {
        self.token = token
        self.graphUUID = graphUUID
    }

    // get_files
    // => file_path, file_url
    public func getFiles(at filePaths: [String], completionHandler: @escaping ([String: URL], Error?) -> Void) {
        let url = URL_BASE.appendingPathComponent("get_files")

        var request = URLRequest(url: url)
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.setValue("Logseq-sync/0.1", forHTTPHeaderField: "User-Agent")
        request.setValue("Bearer \(self.token)", forHTTPHeaderField: "Authorization")

        let payload = [
            "GraphUUID": self.graphUUID ?? "",
            "Files": filePaths
        ] as [String: Any]
        let bodyData = try? JSONSerialization.data(
            withJSONObject: payload,
            options: []
        )
        request.httpMethod = "POST"
        request.httpBody = bodyData

        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard error == nil else {
                completionHandler([:], error)
                return
            }

            if (response as? HTTPURLResponse)?.statusCode != 200 {
                let body = String(data: data!, encoding: .utf8) ?? ""
                completionHandler([:], NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "http error \(body)"]))
                return
            }

            if let data = data {
                let resp = try? JSONDecoder().decode([String: [String: String]].self, from: data)
                let files = resp?["PresignedFileUrls"] ?? [:]
                self.delegate?.debugNotification(["event": "download:prepare"])
                completionHandler(files.mapValues({ url in URL(string: url)!}), nil)
            } else {
                // Handle unexpected error
                completionHandler([:], NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "unexpected error"]))
            }
        }
        task.resume()
    }

    public func getVersionFiles(at filePaths: [String], completionHandler: @escaping ([String: URL], Error?) -> Void) {
        let url = URL_BASE.appendingPathComponent("get_version_files")

        var request = URLRequest(url: url)
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.setValue("Logseq-sync/0.1", forHTTPHeaderField: "User-Agent")
        request.setValue("Bearer \(self.token)", forHTTPHeaderField: "Authorization")

        let payload = [
            "GraphUUID": self.graphUUID ?? "",
            "Files": filePaths
        ] as [String: Any]
        let bodyData = try? JSONSerialization.data(
            withJSONObject: payload,
            options: []
        )
        request.httpMethod = "POST"
        request.httpBody = bodyData

        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard error == nil else {
                completionHandler([:], error)
                return
            }

            if (response as? HTTPURLResponse)?.statusCode != 200 {
                let body = String(data: data!, encoding: .utf8) ?? ""
                completionHandler([:], NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "http error \(body)"]))
                return
            }

            if let data = data {
                let resp = try? JSONDecoder().decode([String: [String: String]].self, from: data)
                let files = resp?["PresignedFileUrls"] ?? [:]
                self.delegate?.debugNotification(["event": "version-download:prepare"])
                completionHandler(files.mapValues({ url in URL(string: url)!}), nil)
            } else {
                // Handle unexpected error
                completionHandler([:], NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "unexpected error"]))
            }
        }
        task.resume()
    }

    public func deleteFiles(_ filePaths: [String], completionHandler: @escaping  (Int?, Error?) -> Void) {
        let url = URL_BASE.appendingPathComponent("delete_files")

        var request = URLRequest(url: url)
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.setValue("Logseq-sync/0.1", forHTTPHeaderField: "User-Agent")
        request.setValue("Bearer \(self.token)", forHTTPHeaderField: "Authorization")

        let payload = [
            "GraphUUID": self.graphUUID ?? "",
            "Files": filePaths,
            "TXId": self.txid
        ] as [String: Any]
        let bodyData = try? JSONSerialization.data(
            withJSONObject: payload,
            options: []
        )
        request.httpMethod = "POST"
        request.httpBody = bodyData

        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard error == nil else {
                completionHandler(nil, error)
                return
            }

            if let response = response as? HTTPURLResponse {
                let body = String(data: data!, encoding: .utf8) ?? ""

                if response.statusCode == 409 {
                    if body.contains("txid_to_validate") {
                        completionHandler(nil, NSError(domain: FileSyncErrorDomain,
                                                       code: 409,
                                                       userInfo: [NSLocalizedDescriptionKey: "invalid txid: \(body)"]))
                        return
                    }
                    // fallthrough
                }
                if response.statusCode != 200 {
                    completionHandler(nil, NSError(domain: FileSyncErrorDomain,
                                                   code: response.statusCode,
                                                   userInfo: [NSLocalizedDescriptionKey: "invalid http status \(response.statusCode): \(body)"]))
                    return
                }
            }

            if let data = data {
                do {
                    let resp = try JSONDecoder().decode(DeleteFilesResponse.self, from: data)
                    // TODO: handle api resp?
                    self.delegate?.debugNotification(["event": "delete"])
                    completionHandler(resp.TXId, nil)
                } catch {
                    completionHandler(nil, error)
                }
            } else {
                // Handle unexpected error
                completionHandler(nil, NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "unexpected error"]))
            }
        }
        task.resume()
    }

    // (txid, error)
    // filePath => [S3Key, md5]
    public func updateFiles(_ fileKeyDict: [String: [String]], completionHandler: @escaping  (Int?, Error?) -> Void) {
        let url = URL_BASE.appendingPathComponent("update_files")

        var request = URLRequest(url: url)
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.setValue("Logseq-sync/0.1", forHTTPHeaderField: "User-Agent")
        request.setValue("Bearer \(self.token)", forHTTPHeaderField: "Authorization")

        let payload = [
            "GraphUUID": self.graphUUID ?? "",
            "Files": Dictionary(uniqueKeysWithValues: fileKeyDict.map { ($0, $1) }) as [String: [String]] as Any,
            "TXId": self.txid
        ] as [String: Any]
        let bodyData = try? JSONSerialization.data(
            withJSONObject: payload,
            options: []
        )
        request.httpMethod = "POST"
        request.httpBody = bodyData

        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard error == nil else {
                completionHandler(nil, error)
                return
            }

            if let response = response as? HTTPURLResponse {
                let body = String(data: data!, encoding: .utf8) ?? ""

                if response.statusCode == 409 {
                    if body.contains("txid_to_validate") {
                        completionHandler(nil, NSError(domain: FileSyncErrorDomain,
                                                       code: 409,
                                                       userInfo: [NSLocalizedDescriptionKey: "invalid txid: \(body)"]))
                        return
                    }
                    // fallthrough
                }
                if response.statusCode != 200 {
                    completionHandler(nil, NSError(domain: FileSyncErrorDomain,
                                                   code: response.statusCode,
                                                   userInfo: [NSLocalizedDescriptionKey: "invalid http status \(response.statusCode): \(body)"]))
                    return
                }
            }

            if let data = data {
                let resp = try? JSONDecoder().decode(UpdateFilesResponse.self, from: data)
                if resp?.UpdateFailedFiles.isEmpty ?? true {
                    completionHandler(resp?.TXId, nil)
                } else {
                    completionHandler(nil, NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "update fail for some files: \(resp?.UpdateFailedFiles.debugDescription)"]))
                }
            } else {
                // Handle unexpected error
                completionHandler(nil, NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "unexpected error"]))
            }
        }
        task.resume()
    }

    public func getTempCredential(completionHandler: @escaping (S3Credential?, Error?) -> Void) {
        let url = URL_BASE.appendingPathComponent("get_temp_credential")

        var request = URLRequest(url: url)
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.setValue("Logseq-sync/0.1", forHTTPHeaderField: "User-Agent")
        request.setValue("Bearer \(self.token)", forHTTPHeaderField: "Authorization")
        request.httpMethod = "POST"
        request.httpBody = Data()

        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard error == nil else {
                completionHandler(nil, error)
                return
            }
            if let response = response as? HTTPURLResponse {
                let body = String(data: data!, encoding: .utf8) ?? ""
                if response.statusCode == 401 {
                    completionHandler(nil, NSError(domain: FileSyncErrorDomain, code: 401, userInfo: [NSLocalizedDescriptionKey: "unauthorized"]))
                    return
                }
                if response.statusCode != 200 {
                    completionHandler(nil, NSError(domain: FileSyncErrorDomain,
                                                   code: response.statusCode,
                                                   userInfo: [NSLocalizedDescriptionKey: "invalid http status \(response.statusCode): \(body)"]))
                    return
                }
            }
            if let data = data {
                let resp = try? JSONDecoder().decode(GetTempCredentialResponse.self, from: data)
                // NOTE: remove BUCKET prefix here.
                self.s3prefix = resp?.S3Prefix.replacingOccurrences(of: "\(BUCKET)/", with: "")
                self.delegate?.debugNotification(["event": "upload:prepare"])
                completionHandler(resp?.Credentials, nil)
            } else {
                // Handle unexpected error
                completionHandler(nil, NSError(domain: FileSyncErrorDomain, code: 400, userInfo: [NSLocalizedDescriptionKey: "unexpected error"]))
            }
        }
        task.resume()
    }

    // [filePath, Key]
    public func uploadTempFiles(_ files: [String: URL],
                                credentials: S3Credential,
                                // key, fraction
                                progressHandler: @escaping ((String, Progress) -> Void),
                                completionHandler: @escaping ([String: String], [String: String], Error?) -> Void) {
        let credentialsProvider = AWSBasicSessionCredentialsProvider(
            accessKey: credentials.AccessKeyId, secretKey: credentials.SecretKey, sessionToken: credentials.SessionToken)

        var region = AWSRegionType.USEast2
        if REGION == "us-east-2" {
            region = .USEast2
        } else if REGION == "us-east-1" {
            region = .USEast1
        } // TODO: string to REGION conversion

        let configuration = AWSServiceConfiguration(region: region, credentialsProvider: credentialsProvider)
        configuration?.timeoutIntervalForRequest = 5.0
        configuration?.timeoutIntervalForResource = 5.0

        let group = DispatchGroup()
        var keyFileDict: [String: String] = [:]
        var fileKeyDict: [String: String] = [:]
        var fileMd5Dict: [String: String] = [:]

        for (filePath, fileLocalURL) in files {
            guard let rawData = try? Data(contentsOf: fileLocalURL) else { continue }
            guard let encryptedRawData = maybeEncrypt(rawData) else { continue }
            group.enter()

            let randFileName = String.random(length: 15).appending(".").appending(fileLocalURL.pathExtension)
            let key = "\(self.s3prefix!)/ios\(randFileName)"

            keyFileDict[key] = filePath
            fileMd5Dict[filePath] = rawData.MD5

            guard let presignURL = getPresignedPutURL(configration: configuration!, key: key) else {
                completionHandler([:], [:], NSError(domain: FileSyncErrorDomain,
                                                    code: 0,
                                                    userInfo: [NSLocalizedDescriptionKey: "cannot get presigned url"]))
                return
            }

            let progressHandler = { progress in
                progressHandler(filePath, progress)
            }
            putContent(url: presignURL, content: encryptedRawData, progressHandler: progressHandler) { error in
                guard error == nil else {
                    print("debug put error \(error!)")
                    completionHandler([:], [:], error!)
                    return
                }
                // only save successful keys
                fileKeyDict[filePath] = key
                keyFileDict.removeValue(forKey: key)
                group.leave()
            }
        }

        group.notify(queue: .main) {
            completionHandler(fileKeyDict, fileMd5Dict, nil)
        }
    }

    public func putContent(url: URL, content: Data,
                           progressHandler: @escaping ((Progress) -> Void),
                           completion: @escaping (Error?) -> Void) {
        AF.upload(content, to: url, method: .put, headers: nil, interceptor: nil, fileManager: FileManager.default, requestModifier: {
            $0.timeoutInterval = max(30.0, Double(content.count / 10 / 1024))
        })
        .uploadProgress { progress in
            print("debug upload progress \(progress)")
            progressHandler(progress)
        }
        .response { response in
            if response.error != nil {
                completion(response.error!)
            } else {
                completion(nil)
            }
        }
    }

    // download a tempFile
    public func download(url: URL,
                         progressHandler: @escaping ((Progress) -> Void), // FIXME: cannot get total bytes
                         completion: @escaping (Result<URL?, Error>) -> Void) {
        AF.download(url)
            .validate(statusCode: 200..<300)
            .responseURL { response in
                if response.error == nil, let url = response.fileURL {
                    completion(.success(url))
                } else {
                    completion(.failure(response.error!))
                }
            }.downloadProgress { progress in
                progressHandler(progress)
            }
    }

    public func download(url: URL, progressHandler: @escaping ((Progress) -> Void)) async -> Result<URL?, Error> {
        return await withCheckedContinuation { continuation in
            download(url: url, progressHandler: progressHandler) { result in
                continuation.resume(returning: result)
            }
        }
    }

    public func cancelAllRequests() async {
        await AF.session.allTasks.forEach { task in
            task.cancel()
        }
    }

    private func getPresignedPutURL(configration: AWSServiceConfiguration, key: String) -> URL? {
        let req = AWSS3GetPreSignedURLRequest()

        req.key = key
        req.bucket = BUCKET
        req.httpMethod = .PUT
        req.expires = Date(timeIntervalSinceNow: 600) // 10min

        var presignedURLString: String?
        AWSS3PreSignedURLBuilder(configuration: configration).getPreSignedURL(req).continueWith { task -> Any? in
            if let error = task.error as NSError? {
                NSLog("error generating presigend url \(error)")
                return nil
            }
            presignedURLString = task.result?.absoluteString
            return nil
        }
        if let presignedURLString = presignedURLString {
            return URL(string: presignedURLString)
        } else {
            return nil
        }
    }
}
