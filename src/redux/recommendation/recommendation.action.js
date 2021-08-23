import UserService from "../../services/user.service";

export const recommendationActions = {
    FETCH_DATA_STARTED: "recommendation/fetch_started",
    FETCH_DATA_SUCCESS: "recommendation/fetch_success",
    FETCH_DATA_FAILURE: "recommendation/fetch_failure",
}

export const fetchSuggestedUsers = (inputs) => (dispatch) => {
    dispatch({ type: recommendationActions.FETCH_DATA_STARTED });
    UserService.getSuggestedUsers(inputs)
        .then((res) => {
            dispatch({ type: recommendationActions.FETCH_DATA_SUCCESS, payload: res.data })
        }, (err) => {
            dispatch({ type: recommendationActions.FETCH_DATA_FAILURE, payload: err?.response?.data || err.messsage })
        })
}