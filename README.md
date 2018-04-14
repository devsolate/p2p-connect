# P2P Connect

A simple P2P Library that wrap from js-libp2p

### Install

```
npm i devsolate/p2p-connect#master --save
```
## Usage

### Server

Run server for store node list
```
'use strict'

const { P2PServer } = require('p2p-connect')
const app = P2PServer(9000, './node.db')
```

### Client Node

Client connect host to get list of nodes and connect to that node

```
'use strict'

const { P2PNode } = require('p2p-connect')
const host = 'http://localhost:3000'

const start = async() => {
    const node = new P2PNode(host)
    await node.start()
}

start()
```

### PubSub

P2P node has 2 method for broadcast and receive data from other node using pubsub Method

#### Subscribe channel

```
node.subscribe(channel_name, (result) => {
    console.log(result.data.toString())
})
```

#### Publish Data
```
node.publish(channel_name, data)
```

