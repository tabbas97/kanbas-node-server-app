import mongoose from "mongoose";
import * as dao from "./dao.js";

let globalUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    // delete req.body._id;
    req.body._id = new mongoose.Types.ObjectId();
    console.log("Create User : ", req.body);
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  
  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUserByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  
  const updateUser = async (req, res) => {
    console.log("Update User : ", req.params);
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    globalUser = await dao.findUserById(userId);
    res.json(status);
  };
  
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    globalUser = currentUser;
    res.json(currentUser);
  };
  
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      globalUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };
  
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    let currentUser = req.session["currentUser"];
    currentUser = globalUser;
    if (!currentUser) {
      res.status(401).json({ message: "Not logged in" });
      return;
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
