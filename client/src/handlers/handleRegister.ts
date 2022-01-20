export async function handleRegister (userInfo:any) {

    await fetch('http://localhost:3000/api/register', {
        headers: {
            "Content-type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(userInfo)
    })
        .then(response => {
                if (response.status !== 200) {
                    console.log("looks like something went wrong here")
                    return
                } else {
                    console.log("api call to register new user was successful")
                }
                return response.json();
            })
            .then(data => {
                    console.log(data)
                    //TODO: res.send "registered"
            })
            .catch(err => {
                console.log(err)
            });
}