import axios from 'axios';
import {apiUrl} from '../../config'
const initState = {
    currentUser: null,
    email: null,
    role: null,
    avatar: null,
    token: null,
    user_id: null,
    user_detail: {}
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
                avatar: action.payload.avatar,
                user_id: action.payload.user_id,
                user_detail: action.payload.user_detail_id
            }
        case 'LOGIN_SUCCESS':{
            return {...state, token: action.payload}
        }
        case 'GUESS':{
            return {...state,role:'guess'}
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
        default:
            return state
    }
}