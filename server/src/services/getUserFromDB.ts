export async function getUserFromDB(userModel: any, URLInput: any) {
    const userInfos: any = await userModel.findById(URLInput);

    return userInfos;
}
