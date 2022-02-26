import express from "express";
import cors from "cors";
import bodyParser, { text } from "body-parser";
import "./db";

const app = express();
const port = 3000;

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

const register = app.post("/api/register", async (req, res, next) => {
  const userInput = req.body;

  async function createUser(userModel: any, userInput: any) {
    const newUser: any = await userModel.create({
      username: userInput.username,
      mail: userInput.mail,
    });

    return newUser;
  }

  const newUser = await createUser(User, userInput)

  res.send({ user: `${newUser}` });
});

const login = app.post("/api/login", async (req, res, next) => {
  const { username, mail } = req.body;

  async function getUser(userModel: any, username: any) {
    let userId = userModel.findOne({ username });
    return userId;
  }

  let userID: any = await getUser(User, username);


  if (!userID) {
    res.send({ message: "this user does not exist" });
  } else {
    res.send({ id: `${userID._id}` });
  }
});

const getUserInfoFromDB = app.get("/api/dashboard/:id", async (req, res, next) => {
  const id = req.params;

  if (!id) {
    res.send({ message: "something went wrong big time" });
  }

  async function getUserById(model: typeof User, id: any) {
    let user: any = await
    model.findById(id)
                    .populate('circle')
    return user;
  }

  let user: any = await getUserById(User, id.id);

    if (!user) {
      res.send({ message: "this user does not exist" });
    }
  
    res.send({ user: user });
    
});

const getPersonDetails = app.get("/api/person-details/:id", async (req, res, next) => {
  const id = req.params;

    if (!id) {
      res.send({ message: "something went wrong big time" });
    }

  async function getPersonById(model: typeof Person, id: any) {
    let person: any = await 
    model.findById(id)
              .populate('memories')
    return person;
  }

  let person: any = await getPersonById(Person, id.id);

      if (!person) {
        res.send({ message: "this user does not exist" });
      }

  res.send(person);
});

const addMemory = app.post("/api/add-memory/:id", async (req, res, next) => {
  const id = req.params;
  const userInput = req.body;

  if (!id) {
    res.send({ message: "something went wrong big time" });
  }

  async function addMemory(model, input) {
    const newMemory = await model.create({
      title: input.title,
      text: input.text,
      author: input.author,
      person: input.person,
    });
    return newMemory;
  }

  async function findPersonAndUpdateMemories(model, id) {
    const newMemory = await addMemory(Memory, userInput);
    const updatedPerson = await model.findByIdAndUpdate(id, {
       $push: { memories: newMemory },
    });
    return updatedPerson;
  }

  const updatedPerson = await findPersonAndUpdateMemories(Person, id.id);

  res.send({ update: updatedPerson });
});

const addPerson = app.post("/api/add-person/:id", async (req, res, next) => {
  const id = req.params;
  const userInput = req.body;

  if (!id) {
    res.send({ message: "something went wrong big time" });
  }

  async function addPerson(model, input) {
    const newPerson = await model.create({
      name: input.name,
      relationship: input.relationship,
    });
    return newPerson;
  }

  async function findUserAndUpdateCircle(model, id) {
    const newPerson = await addPerson(Person, userInput);
    const updatedUser = await model.findByIdAndUpdate(id, {
      $push: { circle: newPerson },
    });
    return updatedUser;
  }

  const updatedUser = await findUserAndUpdateCircle(User, id.id);

  res.send({ update: updatedUser });
});

const getMemoryDetails = app.get("/api/memory-details/:id", async (req, res, next) => {
  const id =req.params;

      if (!id) {
        res.send({ message: "something went wrong big time" });
      }

      async function getMemoryById(model, id) {
        let memory = await model.findById(id)
        return memory;
      }

      let memoryDetails = await getMemoryById(Memory, id.id);

      res.send(memoryDetails);
})