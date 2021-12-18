export async function doesUserExists(userModel, username) {
    const userFromDB : any = userModel.findOne( {username} )
    
    return userFromDB
}