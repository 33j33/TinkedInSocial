import UserService from "../../services/user.service";

export const userActions = {
    SIGNOUT: "user/signout",
    FETCH_USER_SUCCESS: "user/fetch_success",
    FETCH_USER_FAILURE: "user/fetch_failure",
    FETCH_USER_STARTED: "user/fetch_started",
    SAVE_USER_SUCCESS: "user/save_success",
    SAVE_USER_FAILURE: "user/save_failure",
    SAVE_USER_STARTED: "user/save_started",
    UPDATE_INTERESTS_STARTED: "user_interests/update_started",
    UPDATE_INTERESTS_FAILURE: "user_interests/update_failure",
    UPDATE_INTERESTS_SUCCESS: "user_interests/update_success"
}

export const fetchUser = (inputs) => {
    return (dispatch) => {
        dispatch({ type: userActions.FETCH_USER_STARTED });
        UserService.getUser(inputs)
            .then((res) => {
                dispatch({ type: userActions.FETCH_USER_SUCCESS, payload: res.data })
            }, (err) => {
                dispatch({ type: userActions.FETCH_USER_FAILURE, payload: err?.response?.data || err.messsage })
            })
    }
}

export const saveUser = (inputs) => {
    return (dispatch) => {
        dispatch({ type: userActions.SAVE_USER_STARTED })
        UserService.saveUser(inputs)
            .then(res => {
                console.log("res", inputs, res.data);
                dispatch({ type: userActions.SAVE_USER_SUCCESS, payload: res.data })
            }, err => {
                dispatch({ type: userActions.SAVE_USER_FAILURE, payload: err?.response?.data || err.message })
            })
    }
}

export const updateInterests = (inputs) => {
    return (dispatch) => {
        dispatch({type: userActions.UPDATE_INTERESTS_STARTED})
        UserService.updateInterests(inputs)
            .then(res => {
                dispatch({type: userActions.UPDATE_INTERESTS_SUCCESS, payload: res.data})
            }, (err) => {
                dispatch({type: userActions.UPDATE_INTERESTS_SUCCESS, payload: err?.response?.data || err.response})
            })
    }
}