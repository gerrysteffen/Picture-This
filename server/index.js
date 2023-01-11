const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const router = require("./router");

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
