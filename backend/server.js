import express from "express";
import * as dotenv from "dotenv";
import pool from "./src/config/db.js";
import cors from "cors"
import url_router from "./src/routes/url.routers.js"


dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express()
const API_VERSION = process.env.API_VERSION || "v1";

app.use(express.json())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(`/api/${API_VERSION}/shorten`,url_router)

app.get(`/api/${API_VERSION}/health`,(req,resp)=>{
  return resp.status(200).json({"message":"Server is health"})
})

app.listen(PORT, async()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

process.on("SIGTERM",()=>{
  pool.end();
  process.exit(0)
})