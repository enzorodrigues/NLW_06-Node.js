import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthUserController } from "./controllers/middlewares/AuthUserController";
import { CreateComplimentController } from "./controllers/compliments/CreateComplimentController";
import { ensureAuth } from "./middlewares/ensureAuth";
import { ListUserSenderComplimentsController } from "./controllers/compliments/ListUserSenderComplimentsController";
import { ListUserReceiverComplimentsController } from "./controllers/compliments/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/tags/ListTagController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { ChangeUserPasswordController } from "./controllers/users/UpdateUserPasswordController";
import { ChangeUserProfileController } from "./controllers/users/UpdateUserProfileController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { ListUsersByIdController } from "./controllers/users/ListUserByIdController";
import { ListTagIdController } from "./controllers/tags/ListTagIdController";
import { DeleteTagController } from "./controllers/tags/DeleteTagController";
import { UpdateTagController } from "./controllers/tags/UpdateTagController";
import { ComplimentsReceiveController } from "./controllers/compliments/ComplimentsReceiveController";
import { DeleteComplimentSentController } from "./controllers/compliments/DeleteComplimentSentController";


const router = Router();

/* 
 * Importação de controllers   
*/ 
//  Users Controllers
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const listUserController = new ListUsersController();
const changepassword = new ChangeUserPasswordController();
const changeProfile = new ChangeUserProfileController();
const deleteUserController = new DeleteUserController();
const listUserByIdController = new ListUsersByIdController();
// Tags Controllers
const createTagController = new CreateTagController();
const listTagController = new ListTagsController();
const listTagIdController = new ListTagIdController();
const deleteTagController = new DeleteTagController();
const updateTagController = new UpdateTagController();
// Compliments Controllers
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiverComplimentsController();
const complimentsReceiveController = new ComplimentsReceiveController();
const deleteComplimentController = new DeleteComplimentSentController();


/*
 *  Rotas de Usuário 
*/
router.post("/users", createUserController.handle);
router.put("/users/update/password", ensureAuth, changepassword.handle);
router.patch("/user/update/profile", ensureAuth, changeProfile.handle);
router.get("/users/list", ensureAuth, listUserController.handle);
router.delete("/users/delete", ensureAuth, deleteUserController.handle);
router.get("/users/list/:id", ensureAuth, listUserByIdController.handle);

/*
 *  Rotas de Tags
*/
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
router.get("/tags/list", ensureAuth, listTagController.handle);
router.get("/tags/list/:tag_id", ensureAuth, listTagIdController.handle);
router.delete("/tags/delete/:tag_id", ensureAuth, ensureAdmin, deleteTagController.handle);
router.put("/tags/update", ensureAuth, ensureAdmin, updateTagController.handle);

/*
 *  Rotas de Compliments
*/
router.post("/compliments", ensureAuth, createComplimentController.handle);
router.get("/users/compliments/send", ensureAuth, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuth, listUserReceiveComplimentsController.handle);
router.get("/users/compliments/:id", ensureAuth, complimentsReceiveController.handle);
router.delete("/users/compliments/delete", ensureAuth, deleteComplimentController.handle);
 
/*
 * Rota de Middrewares
*/
router.post("/auth", authUserController.handle);






export {router}