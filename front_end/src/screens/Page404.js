import React from 'react';
import image_404 from '../data/images/404.png';
import {baseUrl} from '../config'

export default function Page404() {
    return (
        <div style = {{with:'100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src = {image_404}/>
            <div style = {{fontWeight:'bold',fontSize: '1.5rem', color:'#424242'}}>Trang bạn yêu cầu không có hoặc bạn không có quyền truy cập vào trang này</div>
            <a href = {baseUrl} style = {{margin:30, fontWeight: 'bold', color:'#29b6f6', fontSize: '1.5rem'}}>Trở về trang chủ</a>
        </div>
    )
}
