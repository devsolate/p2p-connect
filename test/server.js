'use strict'

const p2pServer = require('../lib/server')
const app = p2pServer.create(3000, './node.db')