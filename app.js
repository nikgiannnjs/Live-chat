const express = require("express");
const app = express();
const Message = require("./model");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/messages", async (req, res) => {
  await Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  const message = new Message(req.body);
  await message.save((err) => {
    if (err) sendStatus(500);
    res.sendStatus(200);
  });
});

module.exports = app;
