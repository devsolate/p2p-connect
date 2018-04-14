'use strict'

const { P2PNode } = require('../index')
const host = 'http://localhost:3000'

const start = async() => {
    const node = new P2PNode(host)
    await node.start()

    node.subscribe('new', (result) => {
        console.log(result.data.toString())
    })

    setInterval(() => {
        node.publish('new', 'test')
    }, 10000)
}

start()