import User from '../models/user.model';

interface CreateUserInput {
    username: string;
    mail: string;
}

export class UserService {
    userModel: typeof User;

    constructor(userModel: typeof User) {
        this.userModel = userModel;
    }

    async createUser(userInput: CreateUserInput) {
        return await (this.userModel.create(userInput));
    }
}