import axios from 'axios'
import {apiUrl} from '../config'

export const importInventoryStock = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/import`,data, {headers:{authorization:`Bearer ${token}`}}).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}
