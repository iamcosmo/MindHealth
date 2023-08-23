import express from "express";
const app = express();
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();

app.use(express.json());
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userInfo = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userInfo);
  } catch (err) {
    res.status(422).json(err);
  }
});
app.listen(4000);
