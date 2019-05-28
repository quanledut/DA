import axios from 'axios'
import {apiUrl} from '../config'

export const getSaleReport = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/report/sale_report`, {headers:{authorization:`Bearer ${token}`}}).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const getTopEmployee = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/report/top_sale_employee`, {headers:{authorization:`Bearer ${token}`}}).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}