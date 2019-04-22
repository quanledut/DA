import axios from 'axios';
import {apiUrl} from '../../config'
const initState = {
    isLoggedIn: false,
    isShowLoginForm: false,
    isAdmin: true
}

export const LoginReducer = (state = initState, action) => {
    console.log(action.type)
    switch (action.type){
        case 'SHOW_LOGIN_FORM':
            return {
                ...state, isShowLoginForm: true
            }
        case 'HIDE_LOGIN_FORM':
            return {
                ...state, isShowLoginForm: false
            }
        case 'CHECKED_TOKEN':
            return {
                isLoggedIn: true,
                ...state
                }
        case 'TOKEN_CHECKED': 
            return state
        default:
            return state
    }
}