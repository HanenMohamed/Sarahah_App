import Joi from "joi";
import { GenderEnum ,SkillLevelEnum } from "../../Common/enums/user.enum.js";
import { generalRules } from "../../Utils/general-rules.utils.js";

const Names =["javascript","react","node"]


export const SignUpSchema = {
    body:Joi.object({
        firstName:Joi.string().alphanum().required(),
        lastName:Joi.string().min(3).max(20).required(),
       email:generalRules.email,
       password:generalRules.password,
        confirmPassword:Joi.string().valid(Joi.ref("password")),
        minAge:Joi.number().min(18),
        maxAge:Joi.number().max(100),
        age:Joi.number().greater(Joi.ref("minAge")).less(Joi.ref("maxAge")),
        gender:Joi.string().valid(...Object.values(GenderEnum)).optional(),
        phoneNumber:Joi.string(),
        isConfirmed:Joi.boolean().truthy("yes").falsy("no").sensitive(),
        //skillsNames:Joi.array().items(Joi.string()).required(),
        skills:Joi.array().items(Joi.object({
            name:Joi.string().valid(...Names),
            level:Joi.string().valid(...Object.values(SkillLevelEnum)),
        })).required(),
        userId:generalRules._id,
        couponType: Joi.string().valid("fixed","percentage"),
        couponAmount :Joi.when('couponType',{
            is:Joi.string().valid("percentage"),
            then:Joi.number().max(100),
            otherwise: Joi.number().positive()
        })
    }).options({presence:"required"})
    .with('email','password').with('firstName','lastName').with('minAge','maxAge')


}

