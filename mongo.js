const mongoose = require('mongoose')
const connectingString = process.env.MONGO_DB_URI

mongoose.set('strictQuery', true)
mongoose.connect(connectingString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => { console.log(err) })
