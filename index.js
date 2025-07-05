const express = require('express');
const app = express();

const VERIFY_TOKEN = "my_webhook_secret_token";

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Webhook server running on port', port);
});
