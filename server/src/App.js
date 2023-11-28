import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js"

const server= express();

server.use(morgan("dev"))
server.use(cors());
server.use(express.json());
server.use("/", routes);

export default server;