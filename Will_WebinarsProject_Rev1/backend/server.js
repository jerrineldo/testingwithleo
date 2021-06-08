import express from "express"
import cors from "cors"
import webinarsRouter from "./api/webinars.route.js"

const app = express();

app.use(cors());
app.use(express.json());/* Allows server to read requests with json body */

app.use("/api/v1/webinars", webinarsRouter);
app.use("*", (req, res) => res.status(404).json({error:"not found"}));

export default app;