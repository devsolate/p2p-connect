'use strict'

const axios = require('axios')
const P2PNode = require('./p2p')

const urlConfig = {
    getNodes: '/api/nodes',
    addNode: '/api/node'
}

class Node {
    constructor(host) {
        this.host = host
        this.node = null
    }

    async start() {
        // Get Node List
        const knownNodes = await get(this.host + urlConfig.getNodes)
        this.node = await P2PNode.connect(knownNodes.addresses)

        // Add new node to central server
        const nodeAddress = []
        this.node.peerInfo.multiaddrs.forEach((item) => {
            const address = item.toString()
            nodeAddress.push(address)
        })
            
        const nodeAdded = await addNode(this.host + urlConfig.addNode, nodeAddress)
    }

    subscribe(channel, callback) {
        this.node
            .pubsub.subscribe(channel,
                (result) => {
                    callback(result)
                },
                (cb) => {})
    }

    publish(channel, data) {
        this.node.pubsub.publish(
            channel,
            Buffer.from(data),
            () => {}
        )
    }
}

const get = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            });
    })
}


const addNode = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            addresses: data
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            });
    })
}

module.exports = Node