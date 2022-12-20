# @logseq/capacitor-file-sync

File sync for Logseq

## Install

```bash
npm install @logseq/capacitor-file-sync
npx cap sync
```

## API

<docgen-index>

* [`keygen()`](#keygen)
* [`setEnv(...)`](#setenv)
* [`encryptFnames(...)`](#encryptfnames)
* [`decryptFnames(...)`](#decryptfnames)
* [`getLocalFilesMeta(...)`](#getlocalfilesmeta)
* [`getLocalAllFilesMeta(...)`](#getlocalallfilesmeta)
* [`deleteLocalFiles(...)`](#deletelocalfiles)
* [`updateLocalFiles(...)`](#updatelocalfiles)
* [`updateLocalVersionFiles(...)`](#updatelocalversionfiles)
* [`deleteRemoteFiles(...)`](#deleteremotefiles)
* [`updateRemoteFiles(...)`](#updateremotefiles)
* [`encryptWithPassphrase(...)`](#encryptwithpassphrase)
* [`decryptWithPassphrase(...)`](#decryptwithpassphrase)
* [`cancelAllRequests(...)`](#cancelallrequests)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### keygen()

```typescript
keygen() => Promise<{ secretKey: string; publicKey: string; }>
```

**Returns:** <code>Promise&lt;{ secretKey: string; publicKey: string; }&gt;</code>

--------------------


### setEnv(...)

```typescript
setEnv(options: { graphUUID: string; env: string; secretKey: string; publicKey: string; }) => Promise<void>
```

| Param         | Type                                                                                   |
| ------------- | -------------------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; env: string; secretKey: string; publicKey: string; }</code> |

--------------------


### encryptFnames(...)

```typescript
encryptFnames(options: { graphUUID: string; filePaths: string[]; }) => Promise<{ value: string[]; }>
```

| Param         | Type                                                     |
| ------------- | -------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; filePaths: string[]; }</code> |

**Returns:** <code>Promise&lt;{ value: string[]; }&gt;</code>

--------------------


### decryptFnames(...)

```typescript
decryptFnames(options: { graphUUID: string; filePaths: string[]; }) => Promise<{ value: string[]; }>
```

| Param         | Type                                                     |
| ------------- | -------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; filePaths: string[]; }</code> |

**Returns:** <code>Promise&lt;{ value: string[]; }&gt;</code>

--------------------


### getLocalFilesMeta(...)

```typescript
getLocalFilesMeta(options: { graphUUID: string; basePath: string; filePaths: string[]; }) => Promise<{ result: any[]; }>
```

| Param         | Type                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; filePaths: string[]; }</code> |

**Returns:** <code>Promise&lt;{ result: any[]; }&gt;</code>

--------------------


### getLocalAllFilesMeta(...)

```typescript
getLocalAllFilesMeta(options: { graphUUID: string; basePath: string; }) => Promise<{ result: any[]; }>
```

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; }</code> |

**Returns:** <code>Promise&lt;{ result: any[]; }&gt;</code>

--------------------


### deleteLocalFiles(...)

```typescript
deleteLocalFiles(options: { graphUUID: string; basePath: string; filePaths: string[]; }) => Promise<void>
```

| Param         | Type                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; filePaths: string[]; }</code> |

--------------------


### updateLocalFiles(...)

```typescript
updateLocalFiles(options: { graphUUID: string; basePath: string; filePaths: string[]; token: string; }) => Promise<void>
```

| Param         | Type                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; filePaths: string[]; token: string; }</code> |

--------------------


### updateLocalVersionFiles(...)

```typescript
updateLocalVersionFiles(options: { graphUUID: string; basePath: string; filePaths: string[]; token: string; }) => Promise<void>
```

| Param         | Type                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; filePaths: string[]; token: string; }</code> |

--------------------


### deleteRemoteFiles(...)

```typescript
deleteRemoteFiles(options: { graphUUID: string; filePaths: string[]; token: string; txid: number; }) => Promise<{ txid: number; }>
```

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; filePaths: string[]; token: string; txid: number; }</code> |

**Returns:** <code>Promise&lt;{ txid: number; }&gt;</code>

--------------------


### updateRemoteFiles(...)

```typescript
updateRemoteFiles(options: { graphUUID: string; basePath: string; filePaths: string[]; token: string; txid: number; }) => Promise<{ txid: number; }>
```

| Param         | Type                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ graphUUID: string; basePath: string; filePaths: string[]; token: string; txid: number; }</code> |

**Returns:** <code>Promise&lt;{ txid: number; }&gt;</code>

--------------------


### encryptWithPassphrase(...)

```typescript
encryptWithPassphrase(options: { passphrase: string; content: string; }) => Promise<{ data: string; }>
```

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code>{ passphrase: string; content: string; }</code> |

**Returns:** <code>Promise&lt;{ data: string; }&gt;</code>

--------------------


### decryptWithPassphrase(...)

```typescript
decryptWithPassphrase(options: { passphrase: string; content: string; }) => Promise<{ data: string; }>
```

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code>{ passphrase: string; content: string; }</code> |

**Returns:** <code>Promise&lt;{ data: string; }&gt;</code>

--------------------


### cancelAllRequests(...)

```typescript
cancelAllRequests(options: unknown) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`options`** | <code>unknown</code> |

--------------------

</docgen-api>
