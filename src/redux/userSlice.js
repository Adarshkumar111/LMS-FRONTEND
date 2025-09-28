import {createSlice} from '@reduxjs/toolkit';
// import User from '../../../backend/models/user.model';

const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
        }
    }
})
export const {setUserData}=userSlice.actions;
export default userSlice.reducer;