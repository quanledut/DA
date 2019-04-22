const initialState = {
    mail: 1,
    order: 1,
    isShowFullMenu: true,
    isUserPopupOpen: true
}

const PageReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type)
    {
        case 'TOGGLE_MENU_DISPLAY': {
            return {...state, isShowFullMenu:!state.isShowFullMenu}
        }
        case 'TOGGLE_ACCOUNT_DISPLAY':{
            return {...state, isUserPopupOpen:!state.isUserPopupOpen}
        }
        default:
        return state;
    }
}

export default PageReducer