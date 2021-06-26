import { Request, Response } from "express";
import { ChangeUserProfileService } from "../../service/users/UpdateUserProfileService";

class ChangeUserProfileController{
    async handle(request: Request, response: Response){
        const { name, email} = request.body;
        const {user_id} = request;

        const changeUserProfileService = new ChangeUserProfileService();

        const change = await changeUserProfileService.execute({
            id: user_id,
            name,
            email
        });

        return response.json(change);
    }

}

export {ChangeUserProfileController}