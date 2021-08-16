import { userActions } from "./user.actions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    entity: user ? user : {},
    isLoggedIn: user ? true : false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case userActions.FETCH_USER_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                entity: action.payload,
                isLoggedIn: true,
            }
        case userActions.SAVE_USER_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                entity: action.payload,
                isLoggedIn: true,
            }
        case userActions.SIGNOUT:
            localStorage.removeItem("user");
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}
export default reducer;