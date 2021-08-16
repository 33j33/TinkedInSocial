import UserService from "../../services/user.service";

export const commonDataActions = {
    FETCH_DATA_STARTED: "commonData/fetch_started",
    FETCH_DATA_SUCCESS: "commonData/fetch_success",
    FETCH_DATA_FAILURE: "commonData/fetch_failure",
}

export const fetchCommonData = () => (dispatch) => {
    dispatch({ type: commonDataActions.FETCH_DATA_STARTED });
    UserService.getCommonData()
        .then((res) => {
            dispatch({ type: commonDataActions.FETCH_DATA_SUCCESS, payload: res.data })
        }, (err) => {
            dispatch({ type: commonDataActions.FETCH_DATA_FAILURE, payload: err?.response?.data || err.messsage })
        })
}