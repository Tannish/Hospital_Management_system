import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last Name Must Contain At Least 3 Characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10,"Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10,"Phone Number Must Contain Exact 10 Digits!"],
    },
    nic:{
        type: String,
        required: true,
        minLength: [5,"NIC Must Contain Exact 5 Digits!"],
        maxLength: [5,"NIC Must Contain Exact 5 Digits!"],
    },
    dob:{
       type: Date,
       required: [true, "DOB is required!"],
    },
    gender:{
        type: String,
        enum: ["Male", " Female"],
    },
    password:{
        type: String,
        minLength: [8, " Password must contain at least 8 Characters!"],
        required: true,
        select: false
    },
    role:{
        type: String,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartement:{
        type: String,
        required: function (){
            return this.role ==="Doctor";
        }
    },
    docAvatar:{
        public_id: String,
        url: String,
    },
    priorityStatus: {
        type:String,
        enum:["Normal","Urgent","Critical"],
        default:"Normal",
    },
    admitted:{
        type:Boolean,
        default:false
    },
    bedNumber:{
        type:String,
        default:null
    },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
      return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
      } );
};


export const User = mongoose.model("User",userSchema);