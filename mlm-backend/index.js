const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
require("dotenv").config();
require('./database/db');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/api"));

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`)
});
