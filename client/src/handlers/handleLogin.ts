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
                    return
                } else {
                }
                return response.json();
            })
            .catch(err => {
                console.log(err)
            });
}