export function post(route: string, body: Record<string, any>) {
    return fetch(`http://localhost:3000/api/${route}`, {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
    });
}

export function del(route: string) {
    return fetch(`http://localhost:3000/api/${route}`, {
        method : "DELETE"
    })
}