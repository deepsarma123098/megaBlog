import { createSlice } from '@reduxjs/toolkit'


//This slice is to check is user authenticated

const initialState = {
    status: false,
    userData: null,
}


const authSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
       
        login: (state, action)=> {
            state.status = true;
            state.userData = action.payload.userData //or we can use action.payload as userData name are both same
        },

        logout: (state)=> {
            state.status = false;
            state.userData= null;
        },
    },
})


export const {login, logout} = authSlice.actions

export default authSlice.reducer;

//Post must alsogo intoslice i.e. it must has a state. We will have to do it ourselves