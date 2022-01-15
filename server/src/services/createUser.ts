export async function createUser(userModel, userInput: any) {

    const newUser : object = await userModel.create({
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