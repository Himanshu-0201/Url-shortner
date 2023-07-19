import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";


export const postSignUp = (req, res)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
    .then( user => {

        if(user){
            throw new Error ("user already ");
        }

        return bcrypt.hash(password, 12)
    })
    .then(hashPassword => {

        const user = new User({
            name : name,
            email : email,
            password : hashPassword
        })

        return user.save();

    })
    .then(()=>{
        res.json({message : "user succussfully created"});
    })
    .catch(error => console.log(error));

};

export const postSignIn =  async (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    let verifiedPassword;
    let userId;

    User.findOne({email : email})
    .then(user => {

        if(!user){
            throw new Error ("user doesn't exit");
        }

        const hashPassword = user.password;

        verifiedPassword = hashPassword;
        userId = user._id;

        return bcrypt.compare(password, hashPassword);

    })
    .then( (isMatched) => {

        if(isMatched){
            const token =  createdJwtToken({verifiedPassword, userId});
            return res.json({message : "you have logged in succussfully", token : token});
        }

        throw new Error(" Password dosn't match");

    })
    .catch(error => console.log(error));

};


function createdJwtToken ({password, userId}){
    const token = jwt.sign({password : password, userId : userId}, "himanshu");
    return token;
}

