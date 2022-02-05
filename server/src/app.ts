import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./db";

const app = express();
const port = 3000;

import { createUser } from "./services/createUser";
//import { doesUserExists } from './services/loginUser';
import { getUserFromDB } from "./services/getUserFromDB";
import User from "./models/user.model";
import Memory from "./models/memory.model";
import Person from "./models/person.model";

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

//@ts-ignore
app.listen(port, (err) => {
  console.log("Listening and we know of cors:", cors);
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

const register = app.post("/api/register", (req, res, next) => {
  // Read input from request
  const userInput: object = req.body;
  console.log(userInput);

  // Create user from request
  try {
    createUser(User, userInput);
  } catch (err: unknown) {
    console.log(err);
  }

  // Return response from created user
  res.send({ message: "success" });
});

const login = app.post("/api/login", async (req, res, next) => {
  //read input from request
  const { username, mail } = req.body;
  console.log(`this is user ${username}, ${mail}`);
  console.log(username);

  async function getUser(userModel: any, username: any) {
    let userId = userModel.findOne({ username });
    return userId;
  }

  let userID: any = await getUser(User, username);

  console.log(`this is user id ${userID}`);
  console.log(userID._id);

  if (!userID) {
    res.send({ message: "this user does not exist" });
  } else {
    //res.send({message: 'this worked fine'})
    res.send({ id: `${userID._id}` });
  }
});

const getInfosFromDB = app.get("/api/dashboard/:id", async (req, res, next) => {
  //read input from request
  const id = req.params;

  if (!id) {
    res.send({ message: "something went wrong big time" });
  }

  console.log("this is the URLInput");
  console.log(id.id)

  async function getUserById(userModel: typeof User, id: any) {
    let user: any = userModel.findById(id);
    return user;
  }

  let user: any = await getUserById(User, id.id);

  console.log("this comes from api dashboard and is the user");
  console.log(user);

    if (!user) {
      res.send({ message: "this user does not exist" });
    } else {
       res.send({ user: `${user}` });
    }

  //no you do not need a "getPerson" because Person is part of the property circle of User

  //------------------//

//   async function getMemories(memoryModel: typeof Memory, id: any) {
//     let memories = memoryModel.find({ author: `${id}` });
//     return memories;
//   }

//   let memory: any = await getMemories(Memory, id.id);

//   console.log("this comes from api dashboard and are the memories");
//   console.log(memory);
});

const getPersonDetails = app.get("/api/person/:id", async (req, res, next) => {
  const id = req.params;

    if (!id) {
      res.send({ message: "something went wrong big time" });
    } else {
      res.send({ message: "this is your infos" });
    }

  async function getPersonById(model, id) {
    let person = await model.findById({ id });
    return person;
  }



  let personDetails = await getPersonById(Person, id);
});
