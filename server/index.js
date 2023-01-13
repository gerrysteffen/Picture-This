const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const router = require("./router");
const session = require('express-session')

app.use(
  session({ name: 'qid',
  secret: 'superdupersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365
  }
})
);
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD","DELETE"],
    credentials: true,
  }));
app.use(express.json({limit:"50mb"}));
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
