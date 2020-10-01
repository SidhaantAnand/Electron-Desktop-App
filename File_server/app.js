const express = require('express')
const app = express()

app.get('/html/success', (req, res) => res.sendFile('./success.html', { root: __dirname }))
app.get('/js/admin', (req, res) => res.sendFile('./admin.js', { root: __dirname }))
app.get('/js/user', (req, res) => res.sendFile('./user.js', { root: __dirname }))
app.listen(7003)