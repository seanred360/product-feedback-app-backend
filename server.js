const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

mongoose.connect(process.env.MONGO_URL, () => console.log("connected to db"));
app.use(cors());
app.use(bodyParser.json());
app.use("/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("We are on home");
});

server.listen(process.env.PORT || 5000, process.env.HOST || "0.0.0.0", () => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});
