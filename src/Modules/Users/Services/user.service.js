import { compareSync, hashSync } from "bcrypt";
import User from "../../../DB/Models/user.model.js";
import BlackListedTokens from "../../../DB/Models/black-listed-tokens.model.js"
import{asymmetricEncryption,asymmetricDecryption} from "../../../Utils/encryption.utils.js"
import {sendEmail,emitter} from "../../../Utils/send-email.utils.js"
import {customAlphabet} from"nanoid"
import {v4 as uuidv4} from "uuid"
import { generateToken,verifyToken } from "../../../Utils/tokens.utils.js";

const uniqueString= customAlphabet("dhfjugjjk34k",5)

// export const SignUpService = async (req,res)=>{       
//         const {firstName,lastName,email,password,age,gender,phoneNumber} = req.body;
//         const isEmailExist=await User.findOne({$or:[{email},{firstName,lastName}]})
//         if(isEmailExist){
//             return res.status(409).json({message:"User already exists"})
//         }
//         const encryptedPhoneNumber=asymmetricEncryption(phoneNumber)
   
// //hash for password
// const hashedPassword = hashSync(password,+process.env.SALT_ROUNDS)
// const otp = uniqueString()

//         const user=await User.create({
//             firstName,
//             lastName,
//             email,
//             password:hashedPassword,
//             age,
//             gender,
//             phoneNumber:encryptedPhoneNumber,
//             otps:{confirmation:hashSync(otp,+process.env.SALT_ROUNDS)}
//         })

// emitter.emit('sendEmail',{
//     recieverEmail:email,
//     subject:"Confirmation Email",
//     content:
//     `
//     Your Confirmation OTP is: ${otp}
//     `
// })
//         return res.status(201).json({message:"User created successfully",user})
    
// }

// export const ConfirmationEmailService = async(req,res,next)=>{

//     const {email, otp}= req.body
//     const user = await User.findOne({email , isConfirmed:false})
//     if(!user){
//         return next(new Error("User not found or already confirmed",{caused:400}))
//     }
//     const isOtpMatched = compareSync(otp,user.otps?.confirmation)
//     if(!isOtpMatched){
//         return res.status(400).json({message:"Invalid Otp"})

//     }
//     user.isConfirmed=true
//     user.otps.confirmation = undefined
//     await user.save()
//     return res.status(200).json({message:"Confirmed"})


// }



// export const SignInService = async (req,res)=>{
    
//         const {email,password} = req.body;
//         const user=await User.findOne({email})
//         if(!user){
//             return res.status(404).json({message:"invalid email or password"})
//         }
//         const isPasswordMatched = compareSync(password,user.password)
//         if(!isPasswordMatched)
//         {
//             return res.status(404).json({message:"invalid email or password"})
//         }

//         //Generate Token for the loggedin user 
//         const accesstoken = generateToken({
//             _id:user.id,email:user.email},
//             process.env.JWT_ACCESS_KEY,
//             {
//                 expiresIn:process.env.JWT_ACCESS_EXPIRES_IN,
//                 jwtid:uuidv4()
//             })


//         const refreshtoken=generateToken({
//             _id:user.id,email:user.email},
//             process.env.JWT_REFRESH_KEY,
//             {
//                 expiresIn:process.env.JWT_REFRESH_EXPIRES_IN,
//                 jwtid:uuidv4() // will use it to revoke the token 
//             })
//         return res.status(200).json({message:"User signed in successfully",accesstoken,refreshtoken})
// }

// export const UpdateAccountService = async (req,res)=>{

//       const {_id}= req.loggedInUser
//         const {firstName,lastName,email,age,gender} = req.body;

//         const user=await User.findByIdAndUpdate(
//             _id,
//             {firstName,lastName, email,age, gender},
//             {new:true})
//         if(!user){
//            return res.status(404).json({message:"User not found"})
//         }

//         return res.status(200).json({message:"User updated successfully"})
    
// }

// export const DeleteAccountService = async (req,res)=>{
    
//         const {_id} = req.loggedInUser;
//         const deletedResult =await User.findByIdAndDelete(_id)
//         if(!deletedResult){
//            return res.status(404).json({message:"User not found"})
//         }

//         return res.status(200).json({message:"User deleted successfully",deletedResult})
//     }


// export const ListUsersService = async (req,res)=>{
//   let users=await User.find().populate("Messages")

// //   users=users.map((user)=>{
// //     console.log(" Decrypt Input (from DB):", user.phoneNumber);

// //     return {
// //       ...user._doc,
// //       phoneNumber:asymmetricDecryption(user.phoneNumber)
// //     }
// //   })
//   return res.status(200).json(users)
// }

// export const LogoutService=async (req,res)=>{
    
//     const {token:{tokenId,expirationDate},user:{_id}}=req.loggedInUser
//     //convert expiration field to be in date 
//      await BlackListedTokens.create(
//         {
//             tokenId,
//             expirationDate: new Date(expirationDate *1000),
//             userId:_id
//         }
//     )
//     return res.status(200).json({message:"User logged out successfully"})
// }

export const  RefreshTokenService=async (req,res)=>{
    const {refreshtoken}=req.headers
    const decodedData=verifyToken(refreshtoken,process.env.JWT_REFRESH_KEY)
    const accesstoken=generateToken({
        _id:decodedData._id,email:decodedData.email},
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn:process.env.JWT_ACCESS_EXPIRES_IN,
            jwtid:uuidv4() // will use it to revoke the token 
        })
    
    return res.status(200).json({message:"User token is refreshed successfully",accesstoken})
}

// export const UpdatePasswordService = async (req, res, next) => {
//     const { oldPassword, newPassword } = req.body;
//     const { user, token } = req.loggedInUser;
  
//     // check old password
//     const isPasswordMatched = compareSync(oldPassword, user.password);
//     if (!isPasswordMatched) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }
  
//     // hash new password
//     const hashedPassword = hashSync(newPassword, +process.env.SALT_ROUNDS);
  
//     // update password
//     user.password = hashedPassword;
//     await user.save();
  
//     // revoke current token
//     await BlackListedTokens.create({
//       tokenId: token.tokenId,
//       expirationDate: new Date(token.expirationDate * 1000),
//       userId: user._id,
//     });
  
//     return res
//       .status(200)
//       .json({ message: "Password updated successfully, please log in again" });
//   };