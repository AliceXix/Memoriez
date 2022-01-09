export async function handleFormSubmit () {
    console.log('blub');

    let userInfo : object = {
        username: 'hello',
        mail: 'hello@'
        //TODO: req.body.properties

    }

    console.log(userInfo)

    return fetch('http://localhost:3000/api/register', {
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
                console.log('blub');
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


// export function handleFormSubmit(url: any) {
//   return fetch(url).then((response) => response.json());
// }


// handleFormSubmit("/api/register").then((res) =>
//   console.log(res)
// );