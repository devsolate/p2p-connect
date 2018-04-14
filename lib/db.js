'use strict'

const Datastore = require('nedb')

class DB {
    constructor(db) {
        this.db = db
    }

    add(data) {
        return new Promise((resolve, reject) => {
            this.db.insert(data, (err, newNode) => {
                if (err) {
                    return reject(err)
                }

                resolve(newNode)
            })
        })
    }

    get() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, nodes) {
                if (err) {
                    return reject(err)
                }

                resolve(nodes)
            })
        })
    }
}

const create = (filePath) => {
    const db = new Datastore({
        filename: filePath,
        autoload: true
    });
    const instance = new DB(db)
    return instance
}

module.exports = {
    create
}