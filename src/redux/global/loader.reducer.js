const reducer = (state = {}, action) => {
    const { type } = action;
    const tempArr = type.split("_");
    const requestStatus = tempArr.pop();
    switch (true) {
        case ["started", "success", "failure"].includes(requestStatus):
            const requestName = tempArr.join("_");
            return {
                ...state,
                [requestName]: requestStatus === "started"
            }
        default:
            return state
    }
}
export default reducer;