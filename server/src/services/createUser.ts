export async function createUser(userModel:any, userInput:any) {

    const newUser : any = await userModel.create({
        username: userInput.username,
        mail: userInput.mail,
    })

    return newUser;
}

// TODO: In the future, create a Service Class that summarizes all User
// operations, like `createUser`, etc.
// class UserService {
//     createUser() {

//     },

//     findUser() {

//     },

//     checkIfUserIsAvailable() {

//     },
// }