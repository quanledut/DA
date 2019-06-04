import React from 'react'
import {CircularProgress} from '@material-ui/core'

export default function Loading(props) {
    return (
        <div style = {{width:'100%', height:'100%', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', backgroundColor: '#e0e0e0'}}>
            <CircularProgress/>    
            <div style = {{margin: 15, fontWeight: 'bold'}}>
                {props.title || 'Đang tải dữ liệu ...'}   
            </div>           
        </div>
    )
}
