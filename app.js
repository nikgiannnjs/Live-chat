const express = require("express");
const app = express();
const Message = require("./model");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/messages", async (req, res) => {
  try {
    await Message.find({}, (err, messages) => {
      res.send(messages);
    });
  } catch {
    res.status(500).json({
      status: "get /messages",
      message: "Something went wrong",
    });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save((err) => {
      if (err) sendStatus(500);
      res.sendStatus(200);
    });
  } catch {
    res.status(500).json({
      status: "post /messages",
      message: "Something went wrong",
    });
  }
});

module.exports = app;
