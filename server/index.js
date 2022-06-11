import express from "express";
import cors from "cors";
import { User } from "./models/userSchema.js";
import mongoose from "mongoose";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs";
const app = express();
app.use(cors());
app.use(express.json()); //parses anything which is incoming to json IMPPPPPP
// const url = 'http://localhost:5000'
const PORT = process.env.PORT || 5000;
mongoose.connect(
  "mongodb+srv://Nishanth:Nishanth@cluster0.5n3do.mongodb.net/user-db"
);

app.post("/register", async (req, res) => {
  // console.log(req.body)
  try {
    const pass = await bcrypt.hash(req.body.password, 10); //Asynchronously generates a hash for the given string.
    const user = await User.create({
      name: req.body.name,
      username: req.body.userName,
      password: pass,
    });
    // res.sendStatus(200)
    res.json({ status: "ok" });
  } catch (error) {
    // user.save();
    // res.sendStatus(401);
    // res.json(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/login", async (req, res) => {
  // console.log(req.body)
  // req = {username:"shiva@gmail.com",password:"umapathi"}
  const user = await User.findOne({
    username: req.body.userName,
  });
  if (!user) {
    return { status: "error", error: "Invalid login" };
  }
  const pass = bcrypt.compare(req.body.password, user.password);

  if (pass) {
    const token = jwt.sign(
      { name: user.name, userName: user.username },
      "Praumasnsuni#5"
    );
    // res.statusMessage("you are authorized welcome onboard:)") for text/html header
    // res.sendStatus(200)
    // res.status(200).send("you are authorized welcome")
    res.json({ status: "ok", user: token }); //for browser response is sent through login.js (data)

    // return res.json({staus:'ok',user:token})
  } else {
    // res.status(401).send("Enter correct credentials");
    res.json({ status: "error", user: false });
    return;
  }
  // user.save();
});
app.post("/quote", async (req, res) => {
  try {
    const tok = req.headers["x-access-token"];
    const decoded = jwt.verify(tok, "Praumasnsuni#5");
    const username = decoded.userName;
    const quote = req.body.quote;
    // const username = req.body.username;
    await User.updateOne({ username: username }, { $set: { quote: quote } });
    res.json({ status: "ok" });
  } catch (error) {
    console.log("This is error", error);
    res.json({ status: "error", error: "invalid Token" });
  }
});
// app.get("/quote", async (req, res) => {
//   try {
//     const tok = req.headers["x-access-token"];
//     const decoded = jwt.verify(tok, "Praumasnsuni#5");
//     const username = decoded.userName;
//     const user = await User.findOne({ username: username }); //username is instance in db and userName is from front end
//     res.json({ status: "ok", loggedin: user });
//     return;
//   } catch (error) {
//     console.error("Error", error);
//     res.json({ status: "error", loggedin: false });
//   }
// });
app.get("/quote", async (req, res) => {
  try {
    const tok = req.headers["x-access-token"];
    const decoded = jwt.verify(tok, "Praumasnsuni#5");
    const username = decoded.userName;
    if (username) {
      const tuple = await User.findOne({ username: username });
      res.json({ status: "ok", quote: tuple.quote });
    }
  } catch (error) {
    console.error("Error", error);
  }
});

app.listen(PORT, function () {
  console.log(`App is running at port ${PORT}`);
});
