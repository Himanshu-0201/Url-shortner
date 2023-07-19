import mongoose, { Schema } from "mongoose";


const userSchma = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    urls : [
        {
            urlId : {
                type : Schema.Types.ObjectId,
                ref : 'Url'
            }
        }
    ]
});


const user = mongoose.model('User', userSchma);

export default user;