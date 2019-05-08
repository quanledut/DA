import axios from 'axios';
import {apiUrl} from '../config'

export const loadDepartment = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/department`)
        .then(res => {
            if(res.status === 200){
                resolve(res.data)
            }
            reject(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const requestNewProduct = (data) => {
    return new Promise((resolve, reject) =>{
        console.log(localStorage.getItem('tokenTempt'));
        axios.post(`${apiUrl}/products/new`,data,{headers:{'Authorization': `Bearer ${localStorage.getItem('tokenTempt')}`}})
        .then(product => {
            if(product === null) reject('Cannot create product');
            else resolve(product);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const loadProduct = (data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/products`,data).then(response => {
            if(response.status == 200) resolve(response.data);
            else reject('Not found');
        })
        .catch(err => {
            reject('Not found');
        })
    })
}