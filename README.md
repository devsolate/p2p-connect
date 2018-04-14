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

### PubSub