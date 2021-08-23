import { combineReducers } from "redux";
import loaderReducer from "./global/loader.reducer";
import userReducer from "./user/user.reducer";
import errorsReducer from "./global/errors.reducer";
import commonDataReducer from "./global/commonData.reducer";
import recommendationReducer from "./recommendation/recommendation.reducer"

const rootReducer = combineReducers({
    user: userReducer,
    loaders: loaderReducer,
    errors: errorsReducer,
    common: commonDataReducer,
    suggestedUsers: recommendationReducer

})

export default rootReducer;