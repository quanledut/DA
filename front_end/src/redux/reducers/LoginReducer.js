const initState = {
    isLoggedIn: false,
    isShowLoginForm: true
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
        default:
            return state
    }
}