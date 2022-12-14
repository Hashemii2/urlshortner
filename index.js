const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.9xejitq.mongodb.net/?retryWrites=true&w=majority`;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

require('./routers/qr')(app);
require('./routers/short')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
})();
