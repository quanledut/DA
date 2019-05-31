import axios from 'axios'
import {apiUrl} from '../config'

export const getTopSaleProduct = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/top_sale_product`).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const getTopDiscountProduct = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/top_discount_product`).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}