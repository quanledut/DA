import axios from 'axios';
import {apiUrl} from '../config'

export const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/checkToken`,{token})
            .then((res => {
                if(res.status === 200) return resolve(res);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const requestSignUp = (userInfo) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/signUP`,{email: userInfo.email, password: userInfo.password},{
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then((res => {
                if(res.status === 200) return resolve(res);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const requestLogin = (userInfo) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/login`,{email: userInfo.email, password: userInfo.password}).then(res => {
            if(res.status == 200) return resolve(res)
            else reject(res);
        })
        .catch(err => {return reject(err)})
})
}