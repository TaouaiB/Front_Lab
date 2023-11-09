import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify"

// Get User Profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Upload Profile photo
export function uploadProfilePhoto(newPhoto) {
    //getState : function provides all the states available in the store !!!
    return async (dispatch, getState) => {
        try {

            // private API so need to get the params , also new photo should not be JSON , but form-data
            const {data} = await request
                .post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                    // we can get token from localStorage or state ( redux devTool)
                    // headers.Authorization.token : follow verifyToken path !!
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                        "Content-Type" : "multipart/form-data"
                    }
                });
            // update the profile and Database
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            // update the  (user : authSlice) to render the new photo in the navBar
            dispatch(authActions.setUserPhoto(data.profilePhoto));
            toast.success(data.message)

            //modify the user in local storage with new photo
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto;
            localStorage.setItem("userInfo", JSON.stringify(user));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Update Profile
export function updateProfile(userId,profile) {
    return async (dispatch, getState) => {
        try {

            const {data} = await request
                .put(`/api/users/profile/${userId}`, profile, {

                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                });
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUsername(data.username));
                
            // modify the user in local storage with new username
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username;
            localStorage.setItem("userInfo", JSON.stringify(user));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Delete Profile (Account)
export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())
            const {data} = await request
                .delete(`/api/users/profile/${userId}`, {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                });
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(data?.message)
            setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);

        } catch (error) {
            toast.error(error?.response.data.message);
            dispatch(profileActions.clearLoading());
        }

    }
}

// Get Users Count ( for admin dashboard )
export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const {data} = await request
                .get(`/api/users/count`, {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                });
            dispatch(profileActions.setUserCount(data));

        } catch (error) {
            toast.error(error?.response.data.message);
        }

    }
}

// Get All Users Profile ( for admin dashboard )
export function getAllUsersProfile() {
    return async (dispatch, getState) => {
        try {
            const {data} = await request
                .get(`/api/users/profile`, {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                });
            dispatch(profileActions.setProfiles(data));

        } catch (error) {
            toast.error(error?.response.data.message);
        }

    }
}