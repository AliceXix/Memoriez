import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db';
import User, { UserType } from './models/user.model';
import Memory, { MemoryType } from './models/memory.model';
import Person, { PersonType } from './models/person.model';
import { UserService } from './services/UserService';

const app = express();
const port = 3000;

const userService = new UserService(User);

app.use(
    cors({
        origin: '*',
    })
);
app.use(bodyParser.json());

//@ts-ignore
app.listen(port, (err : string) => {
    console.log('Listening and we know of cors:', cors);
    if (err) {
        return console.error(err);
    }

    return console.log(`server is listening on ${port}`);
});


const register = app.post('/api/register', async (req, res, next) => {
    const userInput : {mail : string, username : string} = req.body;
    const newUser = await userService.createUser(userInput);
    //TODO type this

    res.send({ user: `${newUser}` });
});

const login = app.post('/api/login', async (req, res, next) => {
    const { username, mail} : {username : string, mail : string} = req.body;

    async function getUser(userModel: typeof User, username: string) {
        let userData = userModel.findOne({ username });

        return userData;
    }

    const userData = await getUser(User, username);
    const userId : string = userData._id.toString();


    if (!userData) {
        res.status(400).send({ message: 'this user does not exist' });
    } else {
        res.send(userData);
    }
});

const getUserInfoFromDB = app.get('/api/user/:id', async (req, res, next) => {
    const id : string = req.params.id;

    if (!id) {
        res.send({ message: 'something went wrong big time' });
    }

    async function getUserById(model: typeof User, id: string) : Promise<UserType>{
        let user: UserType = await model
            .findById(id)
            .populate('circle')
            .populate('favorites')
            .populate('memories');

        return user;
    }

    let user: UserType = await getUserById(User, id);

    if (!user) {
        res.send({ message: 'this user does not exist' });
    }

    res.send({ user: user });
});

const getPersonDetails = app.get('/api/person-details/:id', async (req, res, next) => {
    const id : string = req.params.id;

    if (!id) {
       return res.send({ message: 'something went wrong big time' });
    } else {
        console.log(id)
    }

    async function getPersonById(model: typeof Person, id: string) : Promise<PersonType>{
        let person: PersonType = await

            model.findById(id)
                .populate('memories')

        return person;
    }

    let person: any = await getPersonById(Person, id);

    if (!person) {
        res.send({ message: 'this user does not exist' });
    } else {
        res.send(person);
    }
});

const addMemory = app.post('/api/add-memory/:id', async (req, res, next) => {
    const id : string = req.params.id;
    const userInput :MemoryType  = req.body;
    //WARNING : YOU MIGHT HAVE BROKEN SOMETHING HERE
    //-> if you did please remove the types here (especially memorytype) and go to person.model and remove the _id from the interface, also spoileralert, you now have the issue on how to type that shit all over again, have fun.

    if (!id) {
        return res.send({ message: 'something went wrong big time' });
    }

    if (!userInput.title) {
        return res.send({ message: 'something went wrong big time - title' });
    }

    if (!userInput.text) {
        return res.send({ message: 'something went wrong big time - text' });
    }

    if (!userInput.author) {
        return res.send({ message: 'something went wrong big time - author' });
    }

    if (!userInput.person) {
        return res.send({ message: 'something went wrong big time - person' });
    }

    async function addMemory(model, input : MemoryType ): Promise<MemoryType> {
        //TODO type mode;l
        const newMemory :MemoryType = await model.create({
            title : input.title,
            text : input.text,
            author : input.author,
            person : input.person._id})

        return newMemory;
    }

    async function findPersonAndUpdateMemories(model, id : string): Promise<UserType> {
        //TODO type model
        const newMemory : MemoryType = await addMemory(Memory, userInput);
        const updatedPerson :UserType = await model.findByIdAndUpdate(id, {
            $push: { memories: newMemory },
        });

        return updatedPerson;
    }

    const updatedPerson : UserType = await findPersonAndUpdateMemories(Person, userInput.person._id);

    res.send({ update: updatedPerson });
});

const addPerson = app.post('/api/add-person/:id', async (req, res, next) => {
    const id : string = req.params.id;
    const userInput : {name : string} = req.body;

    if (!id) {
        res.send({ message: 'something went wrong big time' });
    }

    async function addPerson(model, input : {name : string}) {
        //TODO type model
        const newPerson : PersonType = await model.create({
            name: input.name,
        });

        return newPerson;
    }

    async function findUserAndUpdateCircle(model, id : string) {
        //TODO type model
        const newPerson : PersonType = await addPerson(Person, userInput);
        const updatedUser : UserType = await model.findByIdAndUpdate(id, {
            $push: { circle: newPerson },
        });

        return updatedUser;
    }

    const updatedUser : UserType = await findUserAndUpdateCircle(User, id);

    res.send({ update: updatedUser });
});

const getMemoryDetails = app.get('/api/memory-details/:id', async (req, res, next) => {
    const id : string = req.params.id;

    async function getMemoryById(model , id : string) {
        //TODO type model
        let memory : MemoryType = await model.findById(id)
        .populate('person');

        return memory;
    }

    let memoryDetails : MemoryType = await getMemoryById(Memory, id);

    res.send(memoryDetails);
})

const addFavorite = app.post('/api/add-favorite/:id', async (req, res, next) => {
    const userId : string = req.params.id;
    const memoryId : string = req.body.memoryId;


    async function addFavorite(model, input : string): Promise<any> {
        //TODO type model
        const favorite : MemoryType = await model.findById(input);

        return favorite
    }


    async function findUserAndUpdateFavorites(model: any, id: string, memoryId: string): Promise<any> {
        const newFavorite : MemoryType = await addFavorite(Memory, memoryId);
        const updatedUser : UserType = await model.findByIdAndUpdate(
            id,
            {
                $push: { favorites: memoryId },
            },
            {
                new: true,
            }
        );

        return updatedUser;
    }

    const updatedUser : UserType = await findUserAndUpdateFavorites(
        User,
        userId,
        memoryId
    );

    res.send({ update: updatedUser });
})

const getMemories = app.post("/api/get-memories/:id", async (req, res, next) => {
  const userId : string = req.params.id;
  const searchKey : string = req.body.searchKey;

  async function searchMemoriesByKey(
    searchKey: string,
    model: any,
    //TODO help
    id: string
  ) {

    let filter : {author:string, $text?: any} = {
        author: id,
    };

    if (searchKey) {
        filter.$text = { $search: searchKey };
    }

    let searchedMemories: MemoryType[] = await model.find(filter);

    return searchedMemories;
  }

  const searchedMemories : MemoryType[] = await searchMemoriesByKey(searchKey, Memory, userId);

  res.send(searchedMemories);
});

const deleteMemories = app.delete("/api/delete-memory/:id", async (req, res, next) => {
    const memoryId : string = req.params.id
    let deletionMsg : string = ''

    Memory.findByIdAndDelete(memoryId, (err : string) => {
        if (err) {
            console.log(`An error has occurred deleting memory:`, err);
            res.send("deletion didn't work")
        } else {
            deletionMsg = "deleted"
        }
        return deletionMsg
    })

res.send(deletionMsg)
})

const editMemories = app.post('/api/edit-memory/:id', async (req, res, next) => {
    const title : string = req.body.title
    const text : string = req.body.text
    //TODO are these need here or can they be removed?
    const id : string = req.params.id
    const newInput : {title: string, text : string} = req.body


    Memory.findByIdAndUpdate(id, newInput, { new: true })
    .then(() => {
        res.send({editStatus: "success on update"})
    })
    .catch((err : string) => {
        res.send({ editStatus: err });
    })

})

const deleteFav = app.post("/api/delete-fav/:id", async (req, res, next) => {
    const memoryId : string = req.params.id
    const userId : string = req.body.userId
    let deletionMsg : string = ""

    await User.updateOne({'_id': `${userId}`}, 
    {$pull: {'favorites': `${memoryId}`}});

    console.log("ok")
    res.send({msg: "ok"})

});