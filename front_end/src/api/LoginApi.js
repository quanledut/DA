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