import { Request, Response } from "express";
import { ListTagIdService } from "../../service/tags/ListTagIdService";



class ListTagIdController{
    async handle(request: Request, response: Response){
        const {tag_id} = request.params;

        const listTagIdService = new ListTagIdService();

        const tag = await listTagIdService.execute(tag_id);

        return response.json(tag);
    }

}


export { ListTagIdController }