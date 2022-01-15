export async function createUser(userModel, userInput: any) {
    console.log('printing2:')
    console.log(userInput.username)
    console.log(userInput.mail)
    const newUser : object = await userModel.create({
        username: userInput.username,
        mail: userInput.mail,
    })
    console.log('printing:' + newUser)
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