'use strict'

const libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Mplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
const PeerInfo = require('peer-info')
const Railing = require('libp2p-railing')
const waterfall = require('async/waterfall')

class Node extends libp2p {
    constructor(peerInfo) {
        const modules = {
            transport: [new TCP()],
            connection: {
                muxer: [Mplex],
                crypto: [SECIO]
            },
            discovery: [new Railing(bootstrapers)]
        }
        super(modules, peerInfo)
    }
}

const create = (list) => {

    let node
    waterfall([
        (cb) => PeerInfo.create(cb),
        (peerInfo, cb) => {
            peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
            node = new Node(peerInfo)
            node.start(cb)
        }
    ], (err) => {
        if (err) {
            throw err
        }
    
        console.log('listening on:')
        node.peerInfo.multiaddrs.forEach((ma) => console.log(ma.toString()))
    
        node.on('peer:discovery', (peer) => {
            console.log('Discovered:', peer.id.toB58String())
            node.dial(peer, () => {})
        })
    
        node.on('peer:connect', (peer) => {
            console.log('Connection established to:', peer.id.toB58String())
        })
    })
}

module.exports = {
    create
}