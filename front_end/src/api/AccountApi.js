import axios from 'axios';
import {apiUrl} from '../config';
import {BackgroundColor} from '../data/Config'

export const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/checkToken`,{token}, {headers:{
            'Content-Type': 'application/json'
        }})
            .then((res => {
                if(res.status === 200) return resolve(res.data);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const signUp = (token,data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/register`,data, {headers:{
            authorization: token
        }})
            .then((res => {
                if(res.status === 201) return resolve(res);
                return reject(res);
            }))
            .catch(err => {return reject(err);})
    }) 
}

export const login = (userInfo) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/login`,{email: userInfo.email, password: userInfo.password}).then(res => {
            if(res.status === 200) return resolve(res.data.token)
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
            if(response.status === 200) resolve('Đã đặt lại mật khẩu');
            else reject('Thất bại')
        })
        .catch(err => 
            {reject(err);}
        )
    })
}

export const updateUserDetail = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/users/detail`,data, {headers:{Authorization: `Bearer ${token}`}})
        .then(response => {
            if(response.status == 201) 
            {
                return resolve('Success');
            }
            else 
            {
                return reject('Thất bại')
            }
        })
        .catch(err => 
            {
                return reject(err)
            }
        )
    })
}

export const updateUserAvatar = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/users/avatar`,data, {headers:{Authorization: `Bearer ${token}`}})
        .then(response => {
            if(response.status === 200) resolve(response.data);
            else reject('Thất bại')
        })
        .catch(err => 
            {reject(err);}
        )
    })
}

export const loadEmployeeList = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/users`,{headers: {Authorization: `Bearer ${token}`}, params: data})
        .then(res => {
            if(res.status === 200) {
                return resolve(res.data);
            }
            else {
                return reject(res.data)
            }
        })
        .catch(err => {
            return reject(err)
        })
    })
}

export const loadEmployeeDetail = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/employees`,{headers: {Authorization: `Bearer ${token}`}, params: {id:data}})
        .then(res => {
            if(res.status === 200) {
                return resolve(res.data);
            }
            else {
                return reject(res.data)
            }
        })
        .catch(err => {
            return reject(err)
        })
    })
}
