import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify"

// Login User
export function loginUser(user) {
    // Called : Anonymous Function
    return async (dispatch) => {
        try {
            // Used request which we created above to avoid typing all URL each time !!
            const {data} = await request.post("/api/auth/login",user);
            // payload : data // 
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Logout User
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}

// Register User
export function registerUser(user) {
    // Called : Anonymous Function
    return async (dispatch) => {
        try {
            // Used request which we created above to avoid typing all URL each time !!
            const {data} = await request.post("/api/auth/register",user);
            // payload : data // 
            dispatch(authActions.register(data.message));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Verify Email
export function verifyEmail(userId,token) {
    return async (dispatch) => {
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsEmailVerified());

        } catch (error) {
            console.log(error);
        }

    }
}