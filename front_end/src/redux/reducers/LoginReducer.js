import axios from 'axios';
import {apiUrl} from '../../config'
const initState = {
    currentUser: null,
    email: null,
    role: null,
    avatar: null,
    token: null
}

export const LoginReducer = (state = initState, action) => {
    switch (action.type){
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
        case 'LOGIN_SUCCESS':{
            return {...state, token: action.payload}
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
                role: null,
                token: null,
                avatar: null
            }
        }
        case 'LOGIN_SUCCESS':{
            return {...state,token: action.payload}
        }
        default:
            return state
    }
}