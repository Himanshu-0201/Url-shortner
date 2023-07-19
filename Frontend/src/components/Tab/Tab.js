import { Link, NavLink, useNavigation } from "react-router-dom";
import classes from "./Tab.module.scss";

const Tab = () => {

    return (
        <div className={classes.tab}>
                <NavLink to="/" className={({isActive}) => isActive ? classes.active : ""} > Home </NavLink>
                <NavLink to="/dashboard" className={({isActive}) => isActive ? classes.active : ""}> Dashboard </NavLink>
        </div>
    )
};

export default Tab;