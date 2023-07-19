import { useRef, useState } from "react";
import { Form, useActionData } from "react-router-dom";

import classes from "./Home.module.scss";
import { ClipBoardIcon, CopiedIcon } from "../../Icons/Icons";
import Container from "../Container/Container";



const Home = () => {

    const data = useActionData();
    const urlRef = useRef();
    const [isCopied, setIsCopied] = useState(false);



    console.log(data);
    let shortUrl = "";
    let warning = "";

    if(data){
        shortUrl = data.shortUrl || "";
        warning = data.warning || "";
    }


    const onChangeHandler = ()=>{

    };


    const copyLinkHandler = () => {

        const url = shortUrl;

        if (url.trim().length === 0) {
            console.log("empty");
            return;
        }

        navigator.clipboard.writeText(url)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch(error => console.log(error));
    }



    return (

        <Container>
            <div className={classes['form-container']}>
                <Form className={classes.form} method="POST"  >

                    <input
                        placeholder="Paste your url here"
                        name="url"
                        ref={urlRef}
                        onChange={onChangeHandler}
                    />

                    <button type="submit" >Create</button>
                </Form>

                <div className={classes.warning}>{ warning.trim().length !== 0 && warning}</div>

                {shortUrl.trim().length !== 0
                    &&
                    <div className={classes['short-url']}>
                        <a href={shortUrl}> {shortUrl}</a>
                        {isCopied ? <CopiedIcon /> : <ClipBoardIcon onClick={copyLinkHandler} />}
                    </div>
                }
            </div>
        </Container>
    )
};

export default Home;