import nodemailer from "nodemailer"
import {EventEmitter} from "node:events"

export const sendEmail =async (
    {
    
    recieverEmail,
    cc="ilwlkdrkievbgmjhmn@fxavaj.com",
    subject,
    content,
    attachments=[]
}
)=>{

    const transporter = nodemailer.createTransport({

        host :"smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from :"hanenmohamed937@gmail.com",
        to:recieverEmail,
        cc,
        subject,
        html:content,
        attachments:[{
            filename:"Welcome.png",
            path:"Welcome.png"
        }
        ]
    })
    console.log("info",info);
    return info
}

export const emitter = new EventEmitter()

emitter.on('sendEmail',(args)=>{
    console.log("The sending Email event is started");
    sendEmail(args);
})