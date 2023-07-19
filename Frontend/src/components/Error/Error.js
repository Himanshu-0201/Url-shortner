import { Link, Navigate, useRouteError } from "react-router-dom";

import classes from "./Error.module.scss";


const Error = ()=>{

    const error = useRouteError();

    let title;
    let status = error.status;

    console.log(error.status);


    if(error.status === 401){
        return  <Navigate to="/account?mode=sign-in" />
    }

    if(error.status === 404){
        title = "Page not found on this address!";
    }
    else {
        title = "Something went wrong!"
    }

    return (
        <div className={classes.error}>
            <h1>{title}</h1>
            <h1 className={classes.status}> status code : {status}</h1>
            <Link to="/">Go to home</Link>
        </div>
    )
}

export default Error;