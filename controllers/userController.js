import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {
  const data = req.body;

  // hash password and create new user
  data.password = bcrypt.hashSync(data.password, 10);

  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      res.json({ message: "User registered succesfilly" });
    })
    .catch((error) => {
      res.status(500).json({ error: "User registered failed" });
    });
}

export function loginUser(req, res) {
  const data = req.body;

  User.findOne({
    email: data.email,
  }).then((user) => {

    if (user == null) {
      res.status(404).json({ error: "User not found" });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        data.password,
        user.password
      );

      if (isPasswordCorrect) { 
        const token = jwt.sign({
          firstName : user.firstName,
          lastName : user.lastName,
          email : user.email,
          role : user.role
        },"kv-secret-89")

        res.json({ message: "User logged in successfully" , token : token });

      } else {
        res.status(401).json({ error: "Login failed" });
      }
    }
  });
}
