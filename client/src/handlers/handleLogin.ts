export async function handleLogin (userInfo:any) {

    await fetch('http://localhost:3000/api/login', {
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
                    console.log("you are now logged in")
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