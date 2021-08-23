import { recommendationActions } from "./recommendation.action";

const initialState = []

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case recommendationActions.FETCH_DATA_SUCCESS:
            return [
                ...action.payload
            ]
        default:
            return state
    }

}
export default reducer;