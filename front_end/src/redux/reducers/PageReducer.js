const initialState = {
    mail: 1,
    order: 1,
    isShowFullMenu: true,
    isUserPopupOpen: true,
    isShowSignUp: false,
    screen: 'products'
}

const PageReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case 'TOGGLE_MENU_DISPLAY': {
            return {...state, isShowFullMenu:!state.isShowFullMenu}
        }
        case 'TOGGLE_ACCOUNT_DISPLAY':{
            return {...state, isUserPopupOpen:!state.isUserPopupOpen}
        }
        case 'HIDE_SIGNUP_DIALOG': {
            return {...state, isShowSignUp: false}
        }
        case 'SHOW_SIGNUP_DIALOG': {
            return {...state, isShowSignUp: true}
        }
        case 'ROUTE_SCREEN_BY_REDUX_SAGA':{
            return {...state, screen: action.payload.screen}
        }
        default:
        return state;
    }
}

export default PageReducer