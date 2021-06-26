import { Request, Response } from "express";
import { ListUsersByIdService } from "../../service/users/ListUserByIdService";



class ListUsersByIdController{
    async handle(request: Request, response: Response){
        const { id } = request.params;

        const listUserByIdService = new ListUsersByIdService();
        
        const users = await listUserByIdService.execute(id);

        return response.json(users);
    }

}

export { ListUsersByIdController }