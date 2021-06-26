import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuth(request: Request, response: Response, next: NextFunction) {
    const authtoken = request.headers.authorization;
    
    if(!authtoken){
        return response.status(401).end();
    }

    const [,token] = authtoken.split(" ");

    try {
        const { sub } = verify(token,"b07894b66399098b97ceb781b9af6e24") as IPayload;
        request.user_id = sub;
        return next();
    } catch (error) {
        return response.status(401).end();
    }
    

}


