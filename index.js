const express = require("express");
const app = express();

app.use(express.json());

// Webhook verification (Meta checks this once)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "test123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Incoming messages land here
app.post("/webhook", (req, res) => {
  console.log("Incoming message:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("WhatsApp webhook is live");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});



