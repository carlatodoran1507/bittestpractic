require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./config')

const malwareRouter = require('./src/api/malwares/malware.router')
const authRouter = require('./src/api/auth/auth.router')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(express.json())

app.use('/api/malware', malwareRouter)
app.use('/api/auth', authRouter)
//app.use('/api/user..

mongoose.connect(config.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => {
        console.log('Connected to the DB!')
    }
)

app.listen(config.HTTP_PORT, () => {
    console.log(`Server listening at http://localhost:${config.HTTP_PORT}`)
})