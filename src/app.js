import express from "express";
import cors from 'cors';
import apiRouter from "./routes/apiRouter.js";

const app = express();
const port = 3000;

app.use("/api", apiRouter);

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
