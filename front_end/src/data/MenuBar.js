import React,{Component} from 'react';
import {ShoppingCart, Timeline, HowToReg, ShopTwo} from '@material-ui/icons'

export const Menu  = {
    guess:[
        {
            name: 'products',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>),
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: null
        }        
    ],
    employee: [
        {
            name: 'products',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },
        {
            name: 'employees',
            caption: 'Nhân viên',
            icon: (<HowToReg/>)
        },
        {
            name: 'orders',
            caption: 'Đơn hàng',
            icon: (<ShopTwo/>)
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: null
        }  
    ],
    admin: [
        {
            name: 'products',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },
        {
            name: 'employees',
            caption: 'Nhân viên',
            icon: (<HowToReg/>)
        },
        {
            name: 'orders',
            caption: 'Đơn hàng',
            icon: (<ShopTwo/>)
        },
        {
            name: 'sales',
            caption: 'Khuyến mãi',
            icon: null
        }  
    ]
}