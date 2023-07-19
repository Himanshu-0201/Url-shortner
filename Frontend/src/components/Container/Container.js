import { useNavigation } from "react-router-dom";

import classes from "./Container.module.scss";
import Tab from "../Tab/Tab";
import Loadinng
 from "../Spinner/Loading";
const Container = (props) => {

    const nevigation = useNavigation();
    const isLoading = nevigation.state === 'loading';

    return (
        <>
            <div className={classes.container}>
                <Tab />
                {isLoading ?  <Loadinng /> : props.children} 
            </div>
        </>
    )
};

export default Container;