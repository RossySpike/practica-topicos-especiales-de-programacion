import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./user";

const app = express();
dotenv.config();
const conDb = () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME,
  } = process.env;
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  mongoose
    .connect(url)
    .then(function () {
      console.log("[+] Conexion con bd exitosa!");
    })
    .catch((err) => console.log(`[-] ${err}`));
};

const port = 3005;
app.use(cors({ origin: "*" })); // cors
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.listen(port, function () {
  conDb();
  console.log(`[+] Api corriendo en http://localhost:${port}!`);
});
app.get("/", (req, res) => {
  console.log("[+] Endpoint 1");
  res.status(200).send("Hola axander tu te me pegas");
});

app.post("/", async (req, res) => {
  try {
    let data = req.body;
    let newUser = new User(data);
    await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "Usuario registrado", outcome: [] });
  } catch (err) {
    res
      .status(400)
      .send({
        success: false,
        message: "No se pudo registrar al usuario, intente de nuevo",
        outcome: [],
      });
  }
});
