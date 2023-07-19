import Url from "../models/url.js";
import User from "../models/user.js";
import shortid from "shortid";

export const postCreateUrl = (req, res) => {

    const fullUrl = req.body.url;
    const userId = req.userId;
    let shortUrl ;

    Url.findOne({ fullUrl: fullUrl })
        .then(url => {

            if (url) {
                return res.json({ message: "This url is already created!", shortUrl: url.shortUrl });
            }

            shortUrl = shortid.generate();
            

            const createdUrl = new Url({
                fullUrl: fullUrl,
                shortUrl: shortUrl,
                userId : userId
            });

            return createdUrl.save();
        })
        .then( async url => {

            const user = await User.findById(userId);

            const newUrls = [...user.urls];
            const newElement = {
                urlId : url._id
            }

            newUrls.push(newElement);
            user.urls = newUrls;

            return user.save();
        })
        .then( () => {
            return res.json({ message: "Url created succussfully", shortUrl: shortUrl })
        })
        .catch(error => {
            console.log(error);
        })
}

export const getFullUrlByShortUrl = (req,res)=>{
    
    const shortUrl = req.params.shortUrl;

    Url.findOne({shortUrl : shortUrl})
    .then(url => {

        if(!url){
            throw new Error("Page not found");
        }

        const clicks = url.clicks + 1;
        url.clicks = clicks;

        return url.save();

    })
    .then(url => {
        res.redirect(url.fullUrl)
    })
    .catch(error => console.log(error));

};

export const postUrls =  async (req,res)=>{

    const userId = req.userId;

    let completeUrls;

    try {
        
        const user = await User.findById(userId);
        const urls = user.urls;
    
        completeUrls = await Promise.all( urls.map(async url => {
            // console.log(url);
            const completeUrl = await Url.findById(url.urlId);
            // console.log(completeUrl);
            return completeUrl;
        }))

    } catch (error) {
        console.log(error);
    }

    return res.json({urls : completeUrls});
    // const completeUrls = urls.map( url => {

    //     const completeUrl = Url.findById(url.urlId);

    //     return completeUrl;

    // })

    // console.log(completeUrls);

    // User.findById(userId)
    // .populate('urls.urlId')
    // .exec()
    // .then(urls => {
    //     // console.log(urls);

    // })


    // console.log(user);

    // User.findById(userId)
    // .populate('urls.urlId')
    // .exec()
    // .then(urls => {

    //     console.log("Himanshu", urls);
    // })

    
    // console.log(user);

    // user.populate("urls.urlId")
    // .exec()
    // .then(urls => {
    //     res.json({urls : urls});
    // })
    // .catch(error => console.log(error));


    // Url.find()
    // .then(urls => {
    //     res.json({urls : urls});
    // })
    // .catch(error => {
    //     console.log(error);
    // })

}