
import { Navigate, useLoaderData, useNavigation } from "react-router-dom";

import classes from "./Dashboard.module.scss";
import Container from "../Container/Container";


const DashBoard = () => {

    const { urls } = useLoaderData();
    const nevigation = useNavigation();

    console.log(nevigation.state === 'loading');

    let content;

    const isUrlsEmpty = urls.length === 0;

    if (isUrlsEmpty) {
        content = <p className={classes['no-history']}>You have no history</p>
    }
    else {


        const tableBodyContent = urls.map((row, index) => {

            const shortUrl = "http://localhost:1000/" + row.shortUrl;
            const fullUrl = row.fullUrl;
            const clicks = row.clicks;

            return (
                <tr key={index}>
                    <td><a href={fullUrl} target="blank"> {fullUrl.substring(0, 50)}...</a></td>
                    <td><a href={shortUrl} target="blank"> {shortUrl} </a></td>
                    <td> {clicks} </td>
                </tr>
            )
        })

        content = (
            <table>
                <thead className={classes['table-head']}>
                    <tr>
                        <th>Full url</th>
                        <th>Short url</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>{tableBodyContent}</tbody>
            </table>
        )
    }



    return (
        <Container>
            <div className={classes['table-container']}>
                {content}
            </div>
        </Container>
    )
}

export default DashBoard;