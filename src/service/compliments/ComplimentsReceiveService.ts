import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";


class ComplimentsReceiveService{
    async execute(user_id: string){
        const usersRepositories = getCustomRepository(UsersRepositories);
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const user = await usersRepositories.findOne(user_id);

        if(!user){
            throw new Error("User does not exists");
        }

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            }
        });

        return compliments;
        
    }

}


export {  ComplimentsReceiveService  }