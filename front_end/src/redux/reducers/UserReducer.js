const initialState = {
    UserDetail: {
        name: '',
        phone_number: '',
        birthday: null,
        avatar: '',
        address: '',
        gender: ''
    }
}

export const UserReducer = (state = initialState, action) => {
    switch(action.type){
        default: {
            return state;
        }
    }
}

export default UserReducer