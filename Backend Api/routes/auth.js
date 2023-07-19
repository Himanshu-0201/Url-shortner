import  express  from "express";
const route = express.Router();

import { postSignIn, postSignUp } from "../controllers/auth.js";

route.post('/sign-up', postSignUp);

route.post('/sign-in', postSignIn);

export default route;