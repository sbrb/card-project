const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const route = require('./routes/route');

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDb is Connected..'))
  .catch((error) => console.log(error));

app.use('/', route);

app.use((req, res) => res.status(400).json({ status: false, message: 'Invalid URL.' }));
app.listen(PORT, () => console.log(`Express is running on port ${PORT}.`));