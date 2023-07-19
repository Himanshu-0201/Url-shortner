import { redirect, useLoaderData } from "react-router-dom";


const homeAction = async ({ request, params }) => {

    const formData = await request.formData();
    const url = formData.get("url");

    const token = localStorage.getItem('token');


    if (url.trim().length === 0) {

        return {warning : "Please entere an url"};
        // return redirect('/');
    }

    let response;

    try {

        response = await fetch('http://localhost:1000/create-url', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url
            })
        });

        if(!response.ok){
            throw new Response('not authorized', {status : 401});
        }

        const data = await response.json();
        const shortUrl = "http://localhost:1000/" + data.shortUrl;


        return { shortUrl : shortUrl};



    } catch (error) {
        console.log(error);
        // throw new Error("");
        throw error;
        // throw { message: "Unable to create link", status: 503 };
    }

}

export default homeAction;