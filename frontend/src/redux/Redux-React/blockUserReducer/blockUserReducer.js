import * as actionTypes from "../blockUserActionType/blockUserActionType";

const initialState = {
  isBlocked: false,
  message: "",
  loading: false,
};

const blockUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_USER_BLOCK_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.TOGGLE_USER_BLOCK_SUCCESS:
      return {
        ...state,
        isBlocked: !state.isBlocked,
        message: state.isBlocked ? "User unblocked" : "User temporarily blocked",
        loading: false,
      };
    default:
      return state;
  }
};

export default blockUserReducer;
