import express from "express";
const app = express();
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/User.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sfiuwsf74wtybfb34rt287gbf2";
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOne({ email });
    if (userInfo) {
      const passOK = bcrypt.compareSync(password, userInfo.password);
      if (passOK) {
        console.log("PAssword Matched!");
        jwt.sign(
          { email: userInfo.email, _id: userInfo._id, name: userInfo.name },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            const cookieOptions = {
              sameSite: "none",
              secure: true,
              httpOnly: true,
            };
            res.cookie("token", token, cookieOptions).json(userInfo);
          }
        );
      } else {
        res.status(422).json("Wrong Credentials-p");
      }
    } else {
      res.status(422).json("Wrong Credentials-e");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

// Modify your /logout route in the backend to invalidate the token
app.post("/logout", (req, res) => {
  // Clear the token from the client's cookies or session
  res.clearCookie("token"); // You may need to adjust the cookie name
  // Respond with a success message
  res.status(200).json({ message: "Logout successful" });
});

app.listen(4000);
