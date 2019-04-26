import axios from 'axios';
import {apiUrl} from '../config'
export const LoadProductDepartment = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/department`)
        .then(res => {
            if(res.status == 200){
                resolve(res.data)
            }
            reject(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}