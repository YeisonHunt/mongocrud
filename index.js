const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err)
        } else {
            console.log(documents)
            res.send(documents)
        }
    })
})

const path = require('path')
const db = require('./db')
const collection = "todo"


app.put('/:id', (req, res) => {
    const todoID = req.params.id
    const userInput = req.body

    db.getDB().collection(collection).findOneAndUpdate(
        { _id: db.getPrimaryKey(todoID) },
        { $set: { todo: userInput.todo }}, { returnOriginal: false }, (err, result) => {
            if (err) {
                console.log(err)

            } else {
                res.json(result)
            }
        }

    )
})

app.post('/')

db.connect((err) => {
    if (err) {
        console.log("No se puede conectar a la base de datos")
        process.exit(1)
    } else {
        app.listen(3000, () => {
            console.log("Conectado a la base de datos y escuchando en el puerto 3000")
        })
    }
})