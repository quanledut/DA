import axios from 'axios';
import {apiUrl} from '../config'

export const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/checkToken`,{token}, {headers:{
            'Content-Type': 'application/json'
        }})
            .then((res => {
                console.log(res)
                if(res.status === 200) return resolve(res.data);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const signUp = (data) => {
    return new Promise((resolve, reject) => {
        console.log('SignUpData' + data);
        axios.post(`${apiUrl}/register`,data, {headers:{
            authorization: localStorage.getItem('tokenTempt')
        }})
            .then((res => {
                console.log(res);
                if(res.status === 200) return resolve(res);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const login = (userInfo) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/login`,{email: userInfo.email, password: userInfo.password}).then(res => {
            if(res.status === 200) return resolve(res)
            else reject(res);
        })
        .catch(err => {return reject(err)})
})
}

export const requestForgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/reset`, {email}, {headers:{
            'Content-Type': 'application/json'
        }}).then(res => {
            if(res.status === 200) return resolve(res);
            else return reject(res);
        })
        .catch(err => {return reject(err)});
    })
}

export const requestSetNewPassword = (email, newPassword, token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/updatepass`, {email, password: newPassword, token}, {headers:{'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.status)
            if(response.status === 200) resolve('Đã đặt lại mật khẩu');
            else reject('Thất bại')
        })
        .catch(err => 
            {reject(err);}
        )
    })
}