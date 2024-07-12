const express = require("express");
const app = express();
const Message = require("./model");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/messages", async (req, res) => {
  try {
    const message = await Message.find();
    res.status(200).json(message);
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
      io.emit("message", req.body);
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
