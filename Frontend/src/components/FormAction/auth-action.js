import { redirect } from "react-router-dom";


const authAction = async ({request, params})=>{

    const formData =  Object.fromEntries(await request.formData());
    const email = formData.email;
    const password = formData.password;
    const name = formData.name;
    let mode = formData.mode;

    if(mode === 'sign-in'){

        const response = await fetch('http://localhost:1000/auth/sign-in', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        });

        const data = await response.json();
        const token = data.token;
        
        localStorage.setItem('token', token);

        return redirect('/');

    }
    else if(mode === 'sign-up'){

        const response = await fetch('http://localhost:1000/auth/sign-up', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : email,
                name : name,
                password : password
            })
        });

        if(!response.ok){
            // handle error
        }

        

        return redirect('/account?mode=sign-in');

    }
    else{
        // handle error
    }

}

export default authAction;