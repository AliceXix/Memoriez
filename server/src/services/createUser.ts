export async function createUser(userModel, userInput: any) {
    const newUser : object = userModel.create({
        username : String = userInput.username,
        mail : String = userInput.mail,
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