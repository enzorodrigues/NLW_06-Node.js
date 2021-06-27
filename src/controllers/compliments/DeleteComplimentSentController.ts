import { Request, Response } from "express";
import { DeleteComplimentSentService } from "../../service/compliments/DeleteComplimentSentService";



class DeleteComplimentSentController{
    async handle(request: Request, response: Response){
        const {compliment_id} = request.body
        const { user_id } = request;

        const deleteComplimentSentService = new DeleteComplimentSentService();

        const deleteCompliment = await deleteComplimentSentService.execute(user_id, compliment_id);

        return response.json(deleteCompliment);
    }
}

export { DeleteComplimentSentController }