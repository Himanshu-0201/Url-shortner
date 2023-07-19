
import classes from "./Authentication.module.scss";

import { Form, Link, useSearchParams } from "react-router-dom";



const Authentication = () => {

    const [searchParams] = useSearchParams();
    const entries = Object.fromEntries([...searchParams]);

    const isLogIn = entries.mode === "sign-in";


    return (
        <>
            <div className={classes['form-container']}>
                <Form className={classes.form} method="post" action="">

                    {
                        !isLogIn && <>
                            <label>Name</label>

                            <input
                                name="name"
                                type="text"
                            />
                        </>
                    }

                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                    />

                    <input
                        name="mode"
                        type="hidden"
                        value={entries.mode}
                    />

                    <button type="submit"> {isLogIn ? "Login" : "Singup"}</button>
                    <Link to={`?mode=${isLogIn ? "sign-up" : "sign-in"}`} > {isLogIn ? "create account" : "login account"} </Link>
                </Form>
            </div>
        </>
    )
}



export default Authentication;