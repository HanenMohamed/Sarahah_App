import Joi from "joi";
import {isValidObjectId} from "mongoose"

function objectValidation(value,helper){
    return isValidObjectId(value)? value : helper.message('invalid object id')

}

export const generalRules={

    _id:Joi.string().custom(objectValidation),
     email:Joi.string().email({minDomainSegments:2, multiple:true,separator:","})
            .required(),
            password:Joi
            .string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                "string.pattern.base":"password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            }),

}
    
