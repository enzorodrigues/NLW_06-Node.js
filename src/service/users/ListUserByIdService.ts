import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/UsersRepositories";
import {classToPlain} from "class-transformer";

class ListUsersByIdService{
    async execute(user_id: string){
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({id: user_id});
        
        if(!user){
            throw new Error("User does not exists!");
        }

        return classToPlain(user);
    }
}

export { ListUsersByIdService }