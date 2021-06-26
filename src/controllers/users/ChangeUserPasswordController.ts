import { Request, Response } from "express";
import { ChangeUserPassword } from "../../service/users/ChangeUserPasswordService";




class ChangeUserPasswordController{
    async handle(request: Request, response: Response){
        const { password, new_password} = request.body;
        const { user_id} = request;

        const changeUserPasswordService = new ChangeUserPassword();

        const change = await changeUserPasswordService.execute({
            user_id,
            user_password: password,
            user_newpassword: new_password
        });

        return response.json(change);
    }

}


export { ChangeUserPasswordController }