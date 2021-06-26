import { Request, Response } from "express";
import { UpdateTagService } from "../../service/tags/UpdateTagService";


class UpdateTagController{
    async handle(request: Request, response: Response){
        const {tag_id, tag_name, password} = request.body;
        const {user_id} = request;

        const updateTagService = new UpdateTagService();

        const newTag = await updateTagService.execute({tag_id, tag_name, user_id, user_password: password});

        return response.json(newTag);
    }
}

export { UpdateTagController }