import { commonDataActions } from "./commonData.actions";

const initialState = {

}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case commonDataActions.FETCH_DATA_SUCCESS:
            return {
                ...action.payload
            }
        default:
            return state
    }

}
export default reducer;