import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IPassUserRequest{
    user_id: string;
    user_password: string;
    user_newpassword: string
}

class ChangeUserPassword {
    async execute({user_id, user_password, user_newpassword} : IPassUserRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(!user_password || !user_newpassword){
            throw new Error("Empty fields");
        }
        
        const passwordMatch = await compare(user_password, (await usersRepositories.findOne({id: user_id})).password);

        if(!passwordMatch){
            throw new Error("Password incorrect!");
        }

        if(user_password === user_newpassword){
            throw new Error("Matching passwords!");
        }

        const passwordhash = await hash(user_newpassword, 8);

        await usersRepositories.update({id: user_id},{password: passwordhash});
        const user = await usersRepositories.findOne({id: user_id});
        
        return user;
    }
}


export { ChangeUserPassword }