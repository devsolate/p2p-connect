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
        this.node = await P2PNode.connect()
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