import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../../repositories/TagsRepositories";



class ListTagIdService{
    async execute(tag_id: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tag = await tagsRepositories.findOne({id: tag_id});

        if(!tag){
            throw new Error("Tag does not exists");
        }

        return tag;
    }

}

export { ListTagIdService }