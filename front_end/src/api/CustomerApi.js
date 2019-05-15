import axios from 'axios';
import {apiUrl} from '../config'

export const createNewCustomer = (dataForm, token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/customers/new`,dataForm,{headers:{authorization: `Bearer ${token}`}}).then(res => {
            if(res.status == 201) resolve(res.data);
            else reject(res.data)
        })
        .catch(err => reject(err))
    })
}   

export const getAllCustomer = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/customers`, {headers:{authorization: `Bearer ${token}`}}).then(res => {
            if(res.status == 200) resolve(res.data);
            else reject(res);
        })
        .catch(err => {reject(err)})
    })
}