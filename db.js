const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID
const dbname = "test"
const url = "mongodb+srv://db_user_yeison:40SSntn3iF3vYXV5@clustermongoazure-smaws.azure.mongodb.net/test"
const mongoOptions = { useNewUrlParser: true }

const state = {
    db: null
}

const connect = (cb) => {
    if (state.db) {
        cb()
    } else {
        mongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                cb(err)
            } else {
                state.db = client.db(dbname)
                cb()
            }
        })
    }
}

const getPrimaryKey = (_id) => {
    return objectId(_id);
}

const getDB = () => {
    return state.db
}


module.exports = {
    getDB, connect, getPrimaryKey
}


