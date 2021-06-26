import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest{
    user_id: string;
    user_password: string;
}

class DeleteUserService{
    async execute({user_id, user_password} : IUserRequest){
        const userRepositories = getCustomRepository(UsersRepositories);
        
        if(!user_password){
            throw new Error("Empty password");
        }
        
        const passwordMatch = await compare(user_password, (await userRepositories.findOne({id: user_id})).password);

        if(!passwordMatch){
            throw new Error("Password incorrect!");
        }

        const userDeleted = await userRepositories.findOne({id: user_id});

        try {
            await userRepositories.delete({id: user_id});
        } catch (error) {
            console.log(error);
            throw new Error("Não foi possivel deletar");
        }
        
        return userDeleted;
    }

}

export { DeleteUserService }