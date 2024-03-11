const express = require('express');
const { existsSync } = require('fs');
const path = require('path');
const { PORT } = require('./config.js');

const app = express()

app.use( express.json() )
app.use('/api/payment', require("./route/payment.js"))
app.use('/api*', (req, res) => { res.status(400).end() })

app.use(express.static(path.join(__dirname, 'client')))
app.use('*', (req, res) => {
    let exist = existsSync( path.join( __dirname, `./client${req.baseUrl}.html`) )
    if (exist) res.sendFile( path.join( __dirname, `./client${req.baseUrl}.html`))
    else res.sendFile(path.join(__dirname, 'client', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`for-stripe on http://localhost:${PORT}`)
})