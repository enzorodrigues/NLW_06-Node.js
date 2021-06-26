import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../service/ListUserReceiveComplimentsService";


class ListUserReceiverComplimentsController{

    async handle(request: Request, response: Response){

        const { user_id } = request;
        const listUserReceiverComplimentsService = new ListUserReceiveComplimentsService;

        const compliments = await listUserReceiverComplimentsService.execute(user_id);

        return response.json(compliments);
    }
    

}

export { ListUserReceiverComplimentsController }