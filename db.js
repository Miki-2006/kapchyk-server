const {MongoClient} = require('mongodb')

const mongodbURI = process.env.MongoURI
const client = new MongoClient(mongodbURI)

try {
    client.connect()
    console.log("MongoDB подключен!")
} catch (error) {
    console.error('Ошибка при подключении к MongoDB:', error)
}
const db = client.db('test')

module.exports = db