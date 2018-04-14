'use strict'

const express = require('express')
const DB = require('./db')

const create = (port, dbPath) => {
    const app = express()
    const db = DB.create(dbPath)

    app.get('/api/nodes', (req, res) => {
        return res.send('Hello World!')
    })
    
    app.post('/api/node', (req, res) => {
        
    })
    
    app.listen(port, () => {
        console.log('P2P Server listen on port:' + port)
    })

    return app
}

module.exports = {
    create
}