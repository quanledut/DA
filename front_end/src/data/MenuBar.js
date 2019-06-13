import React,{Component} from 'react';
import {ShoppingCart, Timeline, HowToReg, ShopTwo, PersonOutline, Group, ListAlt, MyLocation, Store} from '@material-ui/icons'
import sales from '../data/ToolbarIcons/sales.png'

export const Menu  = {
    guess:[
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>),
        }, 
        // {
        //     name: '/sales',
        //     caption: 'Khuyến mãi',
        //     icon: ( <div>
        //                 <img style = {{width:24, height:24}} src = {sales}></img>
        //             </div>)
        // },
        {
            name: '/about',
            caption: 'Liên hệ',
            icon: (<MyLocation/>),
        }, 
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
        } , 
        {
            name: '/about',
            caption: 'Liên hệ',
            icon: (<MyLocation/>),
        }, 
    ],
    admin: [
        {
            name: '/',
            caption: 'Sản phẩm',
            icon: (<ShoppingCart/>)
        },
        // {
        //     name: '/sales',
        //     caption: 'Khuyến mãi',
        //     icon: ( <div>
        //                 <img style = {{width:24, height:24}} src = {sales}></img>
        //             </div>)
        // },
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
        },
        {
            name: '/import',
            caption: 'Nhập kho',
            icon: (<Store/>)
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
        } ,
        {
            name: '/import',
            caption: 'Nhập kho',
            icon: (<Store/>)
        } 
    ]
}