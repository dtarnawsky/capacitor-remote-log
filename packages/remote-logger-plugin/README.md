# @capacitor/remote-logger

Remote Logging

## Install

```bash
npm install @capacitor/remote-logger
npx cap sync
```

## API

<docgen-index>

* [`write(...)`](#write)
* [`initialize(...)`](#initialize)
* [`addListener('logStatusChange', ...)`](#addlistenerlogstatuschange)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### write(...)

```typescript
write(message: object) => any
```

Log a message (js object) to the remote logging service

| Param         | Type                |
| ------------- | ------------------- |
| **`message`** | <code>object</code> |

**Returns:** <code>any</code>

--------------------


### initialize(...)

```typescript
initialize(options: Options) => any
```

Initialize the plugin

| Param         | Type                                        |
| ------------- | ------------------------------------------- |
| **`options`** | <code><a href="#options">Options</a></code> |

**Returns:** <code>any</code>

--------------------


### addListener('logStatusChange', ...)

```typescript
addListener(eventName: 'logStatusChange', listenerFunc: (status: LogStatus) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listens for status changes.

| Param              | Type                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>'logStatusChange'</code>                                       |
| **`listenerFunc`** | <code>(status: <a href="#logstatus">LogStatus</a>) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => any
```

Removes all listeners

**Returns:** <code>any</code>

--------------------


### Interfaces


#### Options

| Prop           | Type                | Description                              |
| -------------- | ------------------- | ---------------------------------------- |
| **`hostName`** | <code>string</code> | Host name of the remote logging server   |
| **`port`**     | <code>number</code> | Port number of the remote logging server |


#### LogStatus

| Prop          | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| **`code`**    | <code>'error' \| 'network' \| 'ok'</code> | Status Code |
| **`message`** | <code>string</code>                       | Message     |


#### PluginListenerHandle

| Prop         | Type                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |

</docgen-api>
