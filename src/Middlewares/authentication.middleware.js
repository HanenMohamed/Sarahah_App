import BlackListedTokens from "../DB/Models/black-listed-tokens.model.js"
import User from "../DB/Models/user.model.js"
import { verifyToken } from "../Utils/tokens.utils.js"

export const authenticationMiddleware =async(req,res,next) =>{
 const {accesstoken}= req.headers

 if(!accesstoken)
 {
    return res.status(400).json({message:"Please Provide an access token"})
 }


 //verify the token
 const decodedData= verifyToken(accesstoken,process.env.JWT_ACCESS_KEY)
 if(!decodedData.jti)
 {
    return res.status(401).json({message:"Invalid token"})
 }

 //check if token in black list 
 const blackListedToken = await BlackListedTokens.findOne({tokenId:decodedData.jti})
 if(blackListedToken){
    return res.status(401).json({message:"Token is blacklisted"})
 }

 //get user data from db 
 const user = await User.findById(decodedData?._id)
 if(!user){
    return res.status(404).json({message:"User not found"})

 }

 req.loggedInUser = {user,token:{tokenId:decodedData.jti,expirationDate:decodedData.exp}};
 next()
}