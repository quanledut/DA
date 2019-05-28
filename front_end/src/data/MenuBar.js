import React,{Component} from 'react';
import {ShoppingCart, Timeline, HowToReg, ShopTwo, PersonOutline, Group, ListAlt} from '@material-ui/icons'

export const Menu  = {
    guess:[
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>),
        } 
    ],
    seller: [
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: '/customers',
            caption: 'Khách hàng',
            icon: (<HowToReg/>)
        },
        {
            name: '/saleorders',
            caption: 'Đơn hàng',
            icon: (<ListAlt/>)
        },
        {
            name: '/users/detail',
            caption: 'Cá nhân',
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
            name: '/report',
            caption: 'Thống kê',
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
            icon: (<ListAlt/>)
        },
        {
            name: '/employees',
            caption: 'Nhân viên',
            icon: (<Group/>)
        },
        {
            name: '/users/detail',
            caption: 'Cá nhân',
            icon: (<PersonOutline/>)
        } 
    ],
    manager: [
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        {
            name: '/customers',
            caption: 'Khách hàng',
            icon: (<HowToReg/>)
        },
        {
            name: '/saleorders',
            caption: 'Đơn hàng',
            icon: (<ListAlt/>)
        },
        {
            name: '/employees',
            caption: 'Nhân viên',
            icon: (<Group/>)
        },
        {
            name: '/users/detail',
            caption: 'Cá nhân',
            icon: (<PersonOutline/>)
        } 
    ]
}