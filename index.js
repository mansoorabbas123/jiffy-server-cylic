const express = require('express')
const app = express()
const db = require('./models');

app.all('/', async(req, res) => {
    console.log("Just got a request!")
    const user = await db.User.findAll();
    console.log("user",user)
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)