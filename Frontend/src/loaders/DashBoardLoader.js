
export async function loader() {

    const token = localStorage.token;

    const response = await fetch('http://localhost:1000/urls', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method : 'POST'
    });

    // console.log(response.status);
    if(!response.ok){
        throw new Response('Not authorized' , {status : 401});
    }
    

    const data = await response.json();
    console.log(data);
    const urls = data.urls.reverse();

    return { urls };
}