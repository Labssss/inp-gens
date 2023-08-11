const express = require('express')
const path = require('path');
const authRouter = require('./routes/auth.router')

const app = express()
const port = 3001


app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
    next();
});

app.use("/auth", authRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
