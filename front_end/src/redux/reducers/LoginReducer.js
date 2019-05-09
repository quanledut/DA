import axios from 'axios';
import {apiUrl} from '../../config'
const initState = {
    currentUser: null,
    email: null,
    role: null,
    avatar: null
}

export const LoginReducer = (state = initState, action) => {
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
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role,
                avatar: action.payload.avatar
            }
        case 'SET_CURRENT_USER':{
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role
            }
        }
        case 'LOGOUT':{
            return {
                ...state,
                email: null,
                role: null
            }
        }
        default:
            return state
    }
}