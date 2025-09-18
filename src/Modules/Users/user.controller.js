import {Router} from "express";
import * as userService from "././Services/user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { validateMiddleware } from "../../Middlewares/validation.middleware.js";
import { SignUpSchema } from "../../Validators/Schemas/user.schema.js";
const router = Router();

router.post("/add",validateMiddleware(SignUpSchema),userService.SignUpService)
router.post("/signin",userService.SignInService)
router.put("/update",authenticationMiddleware,userService.UpdateAccountService)
router.delete("/delete",authenticationMiddleware,userService.DeleteAccountService)
router.get("/list",userService.ListUsersService)
router.put("/confirm",userService.ConfirmationEmailService)
router.post("/logout",authenticationMiddleware,userService.LogoutService)
router.post("/refresh-token",userService.RefreshTokenService)
router.put("/update-password",authenticationMiddleware,userService.UpdatePasswordService)



export default router;