'use strict'

const libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Mplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
const PeerInfo = require('peer-info')
const Railing = require('libp2p-railing')
const waterfall = require('async/waterfall')
const MulticastDNS = require('libp2p-mdns')

class Node extends libp2p {
    constructor(peerInfo) {
        const modules = {
            transport: [new TCP()],
            connection: {
                muxer: [Mplex],
                crypto: [SECIO]
            },
            discovery: [new MulticastDNS(peerInfo, { interval: 1000 })]
        }
        super(modules, peerInfo)
    }
}

const connect = (knownNodes) => {
    return new Promise((resolve, reject) => {
        let node

        waterfall([
            (cb) => PeerInfo.create(cb),
            (peerInfo, cb) => {
                peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
                node = new Node(peerInfo)
                node.start(cb)
            },
        ], (err) => {
            if (err) {
                return reject(err)
            }

            // Connecting to Other Peer
            node.on('peer:discovery', (peer) => {
                node.dial(peer, () => {})
            })

            // Connected Other Peer Node
            node.on('peer:connect', (peer) => {
                console.log('Connection established to:', peer.id.toB58String())
            })

            return resolve(node)
        })
    })
}

module.exports = {
    connect
}