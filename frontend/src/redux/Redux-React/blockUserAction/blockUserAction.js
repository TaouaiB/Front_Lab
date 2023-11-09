import * as actionTypes from "../blockUserActionType/blockUserActionType";
import request from "../../../utils/request";
import { toast } from "react-toastify";

const toggleUserBlockStart = () => {
  return {
    type: actionTypes.TOGGLE_USER_BLOCK_START,
  };
};

const toggleUserBlockSuccess = () => {
  return {
    type: actionTypes.TOGGLE_USER_BLOCK_SUCCESS,
  };
};

const toggleUserBlockFailure = (errorMessage) => {
  return {
    type: actionTypes.TOGGLE_USER_BLOCK_FAILURE,
    payload: errorMessage,
  };
};

export const toggleUserBlock = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(toggleUserBlockStart());

            const headers = {
                Authorization: "Bearer " + getState().auth.user.token,
            };

            await request.put(
                `/api/users/block-type/temporary-block/${userId}`,
                null,
                { headers }
            );

            dispatch(toggleUserBlockSuccess());
        } catch (error) {
            console.error("Toggle User Block Error:", error);
            dispatch(
                toggleUserBlockFailure(
                    error?.message || "An error occurred while blocking/unblocking user"
                )
            );
            toast.error(
                error?.response?.data?.message || "An error occurred"
            );
        }
    };
};
