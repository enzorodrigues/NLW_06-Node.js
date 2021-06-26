import {  getCustomRepository} from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{
    async execute({name, email, admin = false, password}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("Email incorrect");
        }

        const UserAlreadyExist = await usersRepository.findOne({email});

        if(UserAlreadyExist){
            throw new Error("User already exists");
        }
        
        const passwordhash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordhash
        });

        await usersRepository.save(user);



        return user;
    }
}

export { CreateUserService}