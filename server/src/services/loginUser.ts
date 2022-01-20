export async function doesUserExists(userModel, userInput) {
    const userFromDB : any = userModel.findOne( {
        username: userInput.username,
        mail: userInput.mail,
    } ).then((found) => {
        console.log(found)
    })
    return userFromDB
}