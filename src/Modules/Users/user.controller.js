import {Router} from "express";
import * as userService from "././Services/user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
const router = Router();

// router.post("/add",userService.SignUpService)
// router.post("/signin",userService.SignInService)
// router.put("/update",authenticationMiddleware,userService.UpdateAccountService)
// router.delete("/delete",authenticationMiddleware,userService.DeleteAccountService)
// router.get("/list",userService.ListUsersService)
// router.put("/confirm",userService.ConfirmationEmailService)
router.post("/logout",authenticationMiddleware,userService.LogoutService)
// router.post("/refresh-token",userService.RefreshTokenService)
// router.put("/update-password",authenticationMiddleware,userService.UpdatePasswordService)



export default router;