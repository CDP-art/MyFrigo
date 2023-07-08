import axios from "axios";

export async function registrati() {
    const res = await axios.post('http://localhost:8000/users/registrati', {
        username: 'Pierluigia',
        password: '8439'
    })
    console.log(res.status, res.data);
    return [res.status, res.data];
}
registrati()