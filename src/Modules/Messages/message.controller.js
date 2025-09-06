import {Router} from "express";
import * as services from "./Services/message.service.js"
const router = Router();


router.post("/send-message/:receiverId",services.sendMessageService)
//router.get("/get-messages",services.getMessagesService)

export default router;