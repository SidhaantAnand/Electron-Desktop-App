const express = require('express')
const app = express()

app.get('/html/success', (req, res) => res.sendFile('./success.html', { root: __dirname }))
app.get('/js/success/admin', (req, res) => res.sendFile('./admin.js', { root: __dirname }))
app.get('/js/success/user', (req, res) => res.sendFile('./user.js', { root: __dirname }))
app.listen(3099, () => console.log('Server ready'))