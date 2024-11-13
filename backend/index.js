const express = require("express");
require("./db/cofig");
const cors = require("cors");
const User = require("./db/user");
const Journal = require("./db/journals");
const app = express();
const Jwt = require("jsonwebtoken");
const JwtKey = "journal";
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  });
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, JwtKey, (err, token) => {
    if (err) {
      resp.send({ result: "Something Went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) {
          resp.send({ result: "password is wrong" });
        }
        if (response) {
          Jwt.sign({ user }, JwtKey, (err, token) => {
            if (err) {
              resp.send({ result: "Something Went wrong" });
            }
            resp.send({ user, auth: token });
          });
        }
      });
    } else {
      resp.send({ result: "Wrong Crediantials" });
    }
  } else {
    resp.send({ result: "Wrong Crediantials" });
  }
});

app.post("/create-journal", VerifyToken, async (req, resp) => {
  let journals = new Journal(req.body);
  let result = await journals.save();
  resp.send(result);
});

app.get("/journal", VerifyToken, async (req, resp) => {
  const journals = await Journal.find();
  if (journals.length > 0) {
    resp.send(journals);
  } else {
    resp.send({ result: "No Journal found" });
  }
});

app.delete("/delete/:id", VerifyToken, async (req, resp) => {
  const result = await Journal.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/update/:id", VerifyToken, async (req, resp) => {
  let result = await Journal.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Result not found" });
  }
});

app.put("/update/:id", VerifyToken, async (req, resp) => {
  let result = await Journal.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", VerifyToken, async (req, resp) => {
  let result = await Journal.find({
    $or: [
      { title: { $regex: req.params.key } },
      { content: { $regex: req.params.key } },
      { value: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});
function VerifyToken(req, resp, next) {
  let Token = req.header("authorization");
  if (Token) {
    Token = Token.split(" ")[1];
    Jwt.verify(Token, JwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide a valid Token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "please provide a valid header" });
  }
}

app.listen(5000);
