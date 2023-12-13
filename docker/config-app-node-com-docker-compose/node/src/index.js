const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'admin',
    password: 'admin',
    database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

app.get('/', async (req, res) => {
    const sql = `INSERT INTO peoples(name) values('Caio Queiroz')`

    connection.query(sql)

    connection.end()

    res.send('<h1>Caio Queiroz - Curso FullCycle</h1>')
})

app.listen(port, () => console.log('server running, on port: ', port))