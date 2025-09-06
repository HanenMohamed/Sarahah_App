import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   firstName:{
    type: String,
    required: true,
    minlength: [3,"First name must be at least 3 characters"],
    maxlength: 20,
    lowercase: true,
    trim: true},

   lastName:{
    type: String, 
    required: true,
    minlength: [3,"Last name must be at least 3 characters"],
    maxlength: 20,
    lowercase: true,
    trim: true},

   age:{
    type: Number,
     required: true,
     min: [18,"Age must be at least 18"],
     max: [100,"Age must be at most 100"],
     index:{name:"idx_age"}},

  gender:{
    type: String,
    enum: ["male","female"],
    default: "male"},

   email:{
    type: String,
    required: true, 
    index:{unique:true,name:"idx_email_unique"}},
   password:{
    type: String,
    required: true,
    },
    phoneNumber:{
        type: String,
        required: true
    },
    otps:{
        confirmation: String,
        resetPassword: String
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }
    
    
},{timestamps: true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    virtuals:{
        fullName:{
            get(){
                return `${this.firstName} ${this.lastName}`
            }
        }
    },
    methods:{
        getFullName(){
            return `${this.firstName} ${this.lastName}`
        },
        getDoubleAge(){
            return this.age * 2
        }
    },
    // collection:"userCollection",
    // capped:{size:1000,max:5}
})

//compound index
userSchema.index({firstName:1,lastName:1},{name:"idx_first_last_unique",unique:true})

userSchema.virtual("Messages",{
    ref:"Messages",
    localField:"_id",
    foreignField:"receiverId"
})

const User = mongoose.model("User", userSchema);

export default User;
