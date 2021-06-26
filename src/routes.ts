import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuth } from "./middlewares/ensureAuth";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/ListTagController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ChangeUserPasswordController } from "./controllers/ChangeUserPasswordController";
import { ChangeUserProfileController } from "./controllers/ChangeUserProfileController";


const router = Router();

/*  Importação de controllers   */ 
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiverComplimentsController();
const listTagController = new ListTagsController();
const listUserController = new ListUsersController();
const changepassword = new ChangeUserPasswordController();
const changeProfile = new ChangeUserProfileController();

/*
 *  Rotas de Usuário 
*/
router.post("/users", createUserController.handle);
router.put("/users/update/password", ensureAuth, changepassword.handle);
router.patch("/user/update/profile", ensureAuth, changeProfile.handle);
router.get("/users/list", ensureAuth, listUserController.handle);

/*
 *  Rotas de Tags
*/
 router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
 router.get("/tags/list", ensureAuth, listTagController.handle);


/*
 *  Rotas de Compliments
*/
 router.post("/compliments", ensureAuth, createComplimentController.handle);
 router.get("/users/compliments/send", ensureAuth,listUserSendComplimentsController.handle);
 router.get("/users/compliments/receive", ensureAuth,listUserReceiveComplimentsController.handle);

 
/*
 * Rota de Middrewares
*/
router.post("/auth", authUserController.handle);






export {router}