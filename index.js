import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Blockchain from './src/blockchain.js';
import Block from './src/block.js';

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

dotenv.config();

const blockChain = new Blockchain(process.env.MINING_DIFFICULTY);

app.get('/chain', (request, response) => {
  response.send(blockChain.chain);
});

app.post('/block', async (request, response) => {
  const data = request.body;

  blockChain.add(new Block(data));

  response.send(blockChain.validate());
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
