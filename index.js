import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "shoperty_verify_123"; // keep this exact value

// 1️⃣ Meta verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// 2️⃣ Receive messages
app.post("/webhook", async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);


