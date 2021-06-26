import { Request, Response } from "express";
import { DeleteUserService } from "../../service/users/DeleteUserService";



class DeleteUserController{
    async handle(request: Request, response: Response){
        const { password } = request.body;
        const { user_id } = request;

        const deleteUserService = new DeleteUserService();

        const userDeleted = await deleteUserService.execute({user_id, user_password: password});

        return response.json(userDeleted);
    }

}


export { DeleteUserController }