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

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGO_URL);

//Test
app.get("/test", (req, res) => {
  res.json("Test ok");
});

//Register
app.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    profileImage,
    profession,
    address,
    dob,
    sex,
    phone,
  } = req.body;
  try {
    const userInfo = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      profileImage,
      profession,
      address,
      dob: new Date(dob),
      sex,
      phone,
    });

    res.json(userInfo);
  } catch (err) {
    res.status(422).json(err);
  }
});

//Login
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
          process.env.JWT_SECRET,
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

//Profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

//Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

app.listen(4000);
