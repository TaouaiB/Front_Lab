import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from './slices/authSlice';
import { profileReducer } from './slices/profileSlice';
import { postReducer } from './slices/PostSlice';
import { categoryReducer } from './slices/categorySlice';
import { commentReducer } from './slices/commentSlice';
import { passwordReducer } from './slices/passwordSlice';
import blockUserReducer from './Redux-React/blockUserReducer/blockUserReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
    password: passwordReducer,
    blockUser: blockUserReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;