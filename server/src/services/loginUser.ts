export function doesUserExists(userModel, userInput) {
    const userFromDB : any = userModel.findOne( {
        username: userInput.username,
        mail: userInput.mail,
    } )
    return userFromDB
}