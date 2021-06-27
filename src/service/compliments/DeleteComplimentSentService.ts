import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";



class DeleteComplimentSentService{
    async execute(user_id: string, compliment_id: string){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        
        if(!compliment_id){
            throw new Error("Empty compliment id");
        }

        const compliment = await complimentsRepositories.findOne({
            where: {
                id: compliment_id,
                user_sender: user_id
            }
        });

        if(!compliment){
            throw new Error("Compliment does not exists/user unauthorized");
        }

        try {
            await complimentsRepositories.delete({id: compliment_id, user_sender: user_id});
        } catch (error) {
            throw new Error("Not possible delete compliment");
        }

        return compliment;

    }
}


export { DeleteComplimentSentService }