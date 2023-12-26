require("dotenv/config");
const express = require("express");
const { exec } = require("child_process");
const server = express();

const indexEnv = process.env.INDEXES;

const indexes = JSON.parse(indexEnv);
server.use(express.json());

server.post("/webhook", async (req, res) => {
  indexes.forEach((value) => {
    exec(`pm2 pull ${value}`, (error, stdout) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
      }
      console.log(`Command executed successfully: ${stdout}`);
    });
  });

  res.status(200).send();
});

const port = process.env.PORT || 3001;
server.listen(port);
