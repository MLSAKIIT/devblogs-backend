const PORT = 3000;

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require('cors');


const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
    //  add your line frontend link here or any other url you want to have access to your server
      'http://localhost:3000',

    ],
    credentials: true,
  })
);

// routes
app.use("/auth", authRoute);

// connect to the database
mongoose
  .connect("mongodb://localhost:27017/express-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

// start the server
app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
