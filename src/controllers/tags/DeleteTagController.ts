import { Request, Response } from "express";
import { DeleteTagService } from "../../service/tags/DeleteTagService";



class DeleteTagController{
    async handle(request: Request, response: Response){
        const {tag_id} = request.params;
        const {password} = request.body;
        const {user_id} = request;

        const deleteTagService = new DeleteTagService();

        const deletedTag = await deleteTagService.execute({tag_id, user_id, user_password: password});

        return response.json(deletedTag);
    }

}

export { DeleteTagController }