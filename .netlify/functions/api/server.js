const {mejorMovimiento} = require('../../ia');
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/.netlify/functions/api', (req, res) => {
  console.log(req.body)
  const tablero = req.body.board
  const movimiento = mejorMovimiento(tablero);
  res.json(movimiento);
});

app.get(
  '/',
  (req, res) => res.json({ ok: true })
)

module.exports.handler = serverless(app);
