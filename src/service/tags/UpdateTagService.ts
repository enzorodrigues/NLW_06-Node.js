import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../../repositories/TagsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";


interface IUpdateRequest{
    user_id: string;
    tag_id: string;
    tag_name: string;
    user_password: string;
}

class UpdateTagService{
    async execute({tag_id, tag_name, user_id, user_password} : IUpdateRequest){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        const tag = await tagsRepositories.findOne({id: tag_id});

        if(!tag){
            throw new Error("Tag does not exists");
        }

        if(!tag_name){
            throw new Error("Empty name field");
        }

        if(!user_password){
            throw new Error("Empty fields");
        }
        
        const passwordMatch = await compare(user_password, (await userRepositories.findOne({id: user_id})).password);

        if(!passwordMatch){
            throw new Error("Password incorrect!");
        }

        await tagsRepositories.update({id: tag_id},{name: tag_name});
        const newtag = await tagsRepositories.findOne({id: tag_id});

        return newtag;

    }
}

export {UpdateTagService}