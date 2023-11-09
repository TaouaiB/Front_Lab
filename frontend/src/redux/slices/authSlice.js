import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",  // anything

    initialState: {
        user: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
        isEmailVerified: false,

    },

    reducers: {
        login(state, action) {
            state.user = action.payload ; // everything coming from server will be inside the payload
            state.registerMessage = null;
        },
        logout(state) {
            state.user = null;
        },
        register(state, action) {
            state.registerMessage = action.payload;
        },
        //when update profile photo , the auth must be updated ( get data from the local storage )
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload;
        },
        //when update username , the auth must be updated ( get data from the local storage )
        setUsername(state, action) {
            state.user.username = action.payload;
        },
        setIsEmailVerified(state){
            state.isEmailVerified = true;
            state.registerMessage = null;
        },
    }

});

const authReducer = authSlice.reducer; 
const authActions = authSlice.actions;

export {authActions, authReducer}