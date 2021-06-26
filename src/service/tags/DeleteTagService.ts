import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../../repositories/TagsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IDeleteTagRequest{
    tag_id: string;
    user_id: string;
    user_password: string;
}


class DeleteTagService{
    async execute({tag_id, user_id, user_password} : IDeleteTagRequest){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        const tag = await tagsRepositories.findOne({id: tag_id});

        if(!tag){
            throw new Error("Tag does not exists");
        }

        if(!user_password){
            throw new Error("Empty fields");
        }
        
        const passwordMatch = await compare(user_password, (await userRepositories.findOne({id: user_id})).password);

        if(!passwordMatch){
            throw new Error("Password incorrect!");
        }

        try {
            await tagsRepositories.delete({id: tag_id});
        } catch (error) {
            throw new Error("Não foi possivel deletar Tag");
        }

        return tag;
    }
}

export{ DeleteTagService }