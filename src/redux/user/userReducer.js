export default function userReducer(state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            return action.payload

        case "CLEAR_USER":
            return {}

        // case "UPDATE_USER":
        //     return

        // case "_USER":
        //     return

        // case "_USER":
        //     return

        // case "_USER":
        //     return
        
        default:
            return state
    }
}