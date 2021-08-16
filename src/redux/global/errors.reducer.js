const reducer = (state = {}, action) => {
    const { type, payload } = action;
    const tempArr = type.split("_");
    const requestStatus = tempArr.pop();
    switch (true) {
        case ["success", "failure"].includes(requestStatus):
            const requestName = tempArr.join("_");
            return {
                ...state,
                [requestName]: requestStatus === "failure" ? payload : "" 
            }
        default:
            return state
    }
}
export default reducer;