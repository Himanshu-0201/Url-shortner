import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser  from "body-parser";

const app = express();

import urlRoute from "./routes/url.js";
import authRoute from "./routes/auth.js";

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoute);
app.use(urlRoute);

const URL = 'mongodb+srv://writetomailhimanshu:himanshu@cluster0.zn9fzn1.mongodb.net/himanshu-url-shortner';

mongoose.connect(URL)
    .then(() => {

        app.listen(1000, () => {
            console.log("This port is running at port 1000");
        });

    })
    .catch(error => console.log(error));
