'use strict'

const Node = require('../lib/node')
const host = 'http://localhost:3000'

const start = async() => {
    const node = new Node(host)
    await node.start()

    node.subscribe('new', (result) => {
        console.log(result.data.toString())
    })

    setInterval(() => {
        node.publish('new', 'test')
    }, 10000)
}

start()