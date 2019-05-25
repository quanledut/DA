import React,{Component} from 'react';
import {ShoppingCart, Timeline, HowToReg, ShopTwo, PersonOutline, Group} from '@material-ui/icons'

export const Menu  = {
    guess:[
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>),
        },
        {
            name: '/sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },    
    ],
    employee: [
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: '/sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },
        {
            name: '/employees',
            caption: 'Nhân viên',
            icon: (<HowToReg/>)
        },
        {
            name: '/saleorders',
            caption: 'Đơn hàng',
            icon: (<ShopTwo/>)
        },
        {
            name: '/users/detail',
            caption: 'Thông tin cá nhân',
            icon: (<PersonOutline/>)
        }  
    ],
    admin: [
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: '/sales',
            caption: 'Khuyến mãi',
            icon: (<Timeline/>)
        },
        {
            name: '/customers',
            caption: 'Khách hàng',
            icon: (<HowToReg/>)
        },
        {
            name: '/saleorders',
            caption: 'Đơn hàng',
            icon: (<ShopTwo/>)
        },
        {
            name: '/employees',
            caption: 'Nhân viên',
            icon: (<Group/>)
        },
        {
            name: '/users/detail',
            caption: 'Thông tin cá nhân',
            icon: (<PersonOutline/>)
        } 
    ]
}