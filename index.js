const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
// const mongoose = require('mongoose');
// Promise = require('bluebird');

const routes = require('./index.route');

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', routes)

app.use(express.static(`${__dirname}/build`))
app.use('/*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
})
// mongoose.Promise = Promise

// const mongoUri = process.env.MONGO_HOST
// mongoose.connect(mongoUri);
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${mongoUri}`)
// })

const port = process.env.PORT

app.listen(port, () => {
  console.info(`server started on port ${port}`); // eslint-disable-line no-console
});