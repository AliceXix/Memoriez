export async function getProfileInfos (URLInput:any) {
    console.log("this is from getProfileInfos")
    console.log(URLInput)

    await fetch(`http://localhost:3000/api/dashboard/${URLInput}`, {
        headers: {
            "Content-type": "application/json",
        },
        method: 'GET',
        // body: JSON.stringify(URLInput)
    })
        .then(response => {
                if (response.status !== 200) {
                    console.log("looks like something went wrong here")
                    return
                } else {
                    console.log("this is your dashboard!")
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