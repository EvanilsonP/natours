const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
}).then(con => {
  // console.log(con.connections);
  console.log('DB connection successful!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});