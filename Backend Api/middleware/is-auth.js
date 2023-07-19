import jwt from "jsonwebtoken";

const isAuth = (req, res, next)=>{

    const authorization = req.get('Authorization');

    if(!authorization){
        throw new Error ("not authenticate");
    }

    const token = authorization.split(' ')[1];
    let decodeToken;

    try {
        decodeToken = jwt.verify(token, "himanshu");
    } catch (error) {
        console.log(error);
    }

    if(!decodeToken){
        const error = new Error("not authenticate");
        throw error;
    }

    console.log(decodeToken);

    req.userId = decodeToken.userId;
    next();

}

export default isAuth;