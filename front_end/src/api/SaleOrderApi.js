import axios from 'axios';
import {apiUrl} from '../config'

export const reloadSaleOrder = (SaleOrder) => {
    console.log(SaleOrder)
    return new Promise(async (resolve, reject) => {
        try
        {
            let NewSaleOrder = await Promise.all(SaleOrder.map(async(item) => {
                let res = await axios.get(`${apiUrl}/products/mainInfo/${item.product._id}`);
                if(res.status == 200) {
                    console.log('Product reloaded')
                    item.product = res.data;
                };
                return item;
            }))
            return resolve(NewSaleOrder)
        }
        catch(err) {
            reject(err)
        }
    })
}

export const createNewSaleOrder = (token, data) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.post(`${apiUrl}/saleorder/new`,data,{headers: {Authorization: `Bearer ${token}`}});
        console.log(res.status);
        if(res.status === 201) {
            console.log(res.data)
            return resolve(res.data);
        }
        else return reject(res.data)
    })
}

export const loadSaleOrderList = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/saleorder/`,{headers: {Authorization: `Bearer ${token}`}, params: data})
        .then(res => {
            if(res.status === 200) {
                return resolve(res.data);
            }
            else return reject(res.data)
        })
        .catch(err => {
            return reject(err)
        })
    })
}

export const loadSaleOrderDetail = (token, data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/saleorders/detail/${data}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            if(res.status === 200) {
                return resolve(res.data);
            }
            else return reject(res.data)
        })
        .catch(err => {
            return reject(err)
        })
    })
}

export const nextStateSaleOrder = (token, data) => {
    return new Promise((resolve, reject) => {
        console.log("Action token: " + token)
        axios.put(`${apiUrl}/saleorders/nextstatus/${data}`,{},{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            if(res.status === 200) {
                return resolve(res.data);
            }
            else return reject(res.data)
        })
        .catch(err => {
            return reject(err)
        })
    })
}
