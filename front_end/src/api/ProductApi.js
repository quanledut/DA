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

export const requestNewProduct = (token, data) => {
    return new Promise((resolve, reject) =>{
        axios.post(`${apiUrl}/products/new`,data,{headers:{'Authorization': `Bearer ${token}`}})
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
        if(!data){
            axios.get(`${apiUrl}/products`).then(response => {
                if(response.status == 200) resolve(response.data);
                else reject('Not found');
            })
            .catch(err => {
                reject('Not found');
            })
        }
        else {
            axios.get(`${apiUrl}/products`,{params:data}).then(response => {
                if(response.status == 200) resolve(response.data);
                else reject('Not found');
            })
            .catch(err => {
                reject('Not found');
            })
        }
    })
}

export const getProductDetail = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/products/${id}`).then(res => {
            if(res.status === 200 && res.data){
                resolve(res.data);
            }
            reject(res.data)
        })
        .catch(err => {reject(err)})
    })
}

export const loadTopProductBuyWith = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/products/${id}/top_product_buy_with`).then(res => {
            if(res.status === 200 && res.data){
                resolve(res.data);
            }
            reject(res.data)
        })
        .catch(err => {reject(err)})
    })
}

export const loadCustomerBuyedProduct = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/products/${id}/customer_buyed`).then(res => {
            if(res.status === 200 && res.data){
                resolve(res.data);
            }
            reject(res.data)
        })
        .catch(err => {reject(err)})
    })
}


export const changeProductDetail = (token, product) => {
    return new Promise((resolve, reject) => {
        axios.put(`${apiUrl}/products/${product._id}`,product, {headers:{Authorization:`Bearer ${token}`}}).then(res => {
            if(res.status == 200) resolve('Updated');
            else reject('Not Updated')
        }).catch(err => reject(err))
    })
}

export const loadAllProduct = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/all_products`).then(res => {
            if(res.status == 200) resolve(res.data);
            else reject('Not found')
        }).catch(err => reject(err))
    })
}

