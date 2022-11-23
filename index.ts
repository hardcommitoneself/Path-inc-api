import express from "express";

const app = express();
const port = 5000;

app.listen(port, () =>
  console.log(`Path inc backend endpoint is running on port ${port}`)
);
