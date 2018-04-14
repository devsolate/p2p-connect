'use strict'

const { P2PServer } = require('../index')
const app = P2PServer(3000, './node.db')