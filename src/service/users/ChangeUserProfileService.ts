import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserProfile{
    id: string;
    name: string;
    email: string
}

class ChangeUserProfileService{
    async execute({id, name, email}: IUserProfile){
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(!name && !email){
            throw new Error("Empty fields");
        }
        
        if(name){
            await usersRepositories.update({id},{name});
        }
        if(email){
            await usersRepositories.update({id},{email});
        }

        const user = await usersRepositories.findOne({id});

        return user;
    }

}

export { ChangeUserProfileService }