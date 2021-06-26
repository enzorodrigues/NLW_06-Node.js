import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs"
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";


interface IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: IAuthRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const userExist = await usersRepositories.findOne({email});

        if(!userExist){
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, userExist.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        const token = sign(
            {
            email: userExist.email
            }, 
            "b07894b66399098b97ceb781b9af6e24", 
            {
            subject: userExist.id,
            expiresIn: "1d"
            });

            return token;
    }

}


export { AuthUserService }