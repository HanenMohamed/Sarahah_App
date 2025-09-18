

const reqKeys=["body","params","query","headers"]
export const validateMiddleware = (schema)=>{
    return (req,res,next)=>{
        const validationErrors=[]
        for(const key of reqKeys){
            if(schema[key]){
                const {error}=schema[key].validate(req[key],{abortEarly:false})
                if(error){
                    console.log("validation error",error.details)
                    validationErrors.push(...error.details)
                }
            }
        }
        if(validationErrors.length){
            return res.status(400).json({message:"validation failed",error:validationErrors})
        }

        next()
    }
}