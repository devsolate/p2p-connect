'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const DB = require('./db')

const create = (port, dbPath) => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    
    const db = DB.create(dbPath)

    app.get('/api/nodes', async (req, res) => {
        const nodes = await db.get()
        return res.json({
            addresses: nodes.map((item) => {
                return item.address
            })
        })
    })
    
    app.post('/api/node', async (req, res) => {
        const address = req.body
        const result = await db.add(address)
        return res.json(address)
    })
    
    app.listen(port, () => {
        console.log('P2P Server listen on port:' + port)
    })

    return app
}

module.exports = create