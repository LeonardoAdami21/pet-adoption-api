import express from "express";
import cors from "cors";
import { connectMongo } from "./config/mongo.config.js";
import { PORT } from "./env/envoriment.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectMongo();

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/api`);
});