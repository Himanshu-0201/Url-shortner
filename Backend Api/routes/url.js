
import express from "express";
import { getFullUrlByShortUrl, postCreateUrl, postUrls } from "../controllers/url.js";
import isAuth from "../middleware/is-auth.js";

const route = express.Router();

route.post('/create-url', isAuth, postCreateUrl);

route.post('/urls',  isAuth, postUrls);

route.get('/:shortUrl', getFullUrlByShortUrl);

export default route;