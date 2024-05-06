const express= require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const app = express()
const PORT = 4444

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Setting up middlewares
app.use(cors());
app.use(express.json());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/admin", require("./routes/adminApi"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
  });