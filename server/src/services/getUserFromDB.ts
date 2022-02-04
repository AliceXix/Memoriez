export async function getUserFromDB(userModel:any, URLInput:any) {


    console.log(URLInput)

    const userInfos : any = await userModel.findById(URLInput)

    return userInfos;
}