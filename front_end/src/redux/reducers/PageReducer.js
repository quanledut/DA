const initialState = {
    mail: 1,
    order: 1,
    isShowFullMenu: true,
    isUserPopupOpen: true,
    loginFormState : false,
    isShowSignUp: false,
    screen: 'products',
    isShowForgotPasswordForm: false
}

const PageReducer = (state = initialState, action) => {
    console.log('Action: '+ action.type);
    console.log('Data: '+ JSON.stringify(action.payload));
    console.log();
    switch (action.type)
    {
        case 'TOGGLE_MENU_DISPLAY': {
            return {...state, isShowFullMenu:!state.isShowFullMenu}
            break;
        }
        case 'TOGGLE_ACCOUNT_DISPLAY':{
            return {...state, isUserPopupOpen:!state.isUserPopupOpen}
            break;
        }
        case 'SHOW_LOGIN_FORM':{
            return {...state,loginFormState: true}
            break;
        }
        case 'HIDE_LOGIN_FORM':{
            return {...state,loginFormState: false}
            break;
        }
        case 'LOGIN_SUCCESS':{
            return {...state,loginFormState: false}
            break;
        }
        case 'HIDE_SIGNUP_DIALOG': {
            return {...state, isShowSignUp: false}
            break;
        }
        case 'SHOW_SIGNUP_DIALOG': {
            return {...state, isShowSignUp: true}
            break;
        }
        case 'ROUTE_SCREEN_BY_REDUX_SAGA':{
            return {...state, screen: action.payload}
            break;
        }
        case 'HIDE_FORGOT_PASSWORD_FORM':{
            return {...state, isShowForgotPasswordForm: false}
            break;
        }
        case 'SHOW_FORGOT_PASSWORD_FORM':{
            return {...state, isShowForgotPasswordForm: true}
            break;
        }
        default:
        return state;
    }
}

export default PageReducer