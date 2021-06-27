import { Request, Response } from "express";
import { ComplimentsReceiveService } from "../../service/compliments/ComplimentsReceiveService";


class ComplimentsReceiveController{
    async handle(request: Request, response: Response){
        const {id} = request.params;

        const complimentsReceiveService = new ComplimentsReceiveService();

        const compliments = await complimentsReceiveService.execute(id);

        return response.json(compliments);
    }

}

export {ComplimentsReceiveController}