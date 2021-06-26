import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"



class CreateTagService{
     async execute(name: string){
        const tagsRepossitories = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Incorrect name!");
        }

        const tagAlreadyExist = await tagsRepossitories.findOne({name});

        if(tagAlreadyExist){
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepossitories.create({name});

        await tagsRepossitories.save(tag);
        return tag;
     }
}

export { CreateTagService }