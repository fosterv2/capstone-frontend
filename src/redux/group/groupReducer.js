export default function groupReducer(state = [], action) {
    switch (action.type) {
        case "ADD_GROUP":
            return [...state, action.payload]

        case "UPDATE_GROUP":
        // case "JOIN_GROUP":
        // case "LEAVE_GROUP":
            return state.map(group => group.id === action.payload.id ? action.payload : group)

        case "DELETE_GROUP":
            return

        // case "_GROUP":
        //     return

        case "ADD_GROUPS":
            return action.groups

        default:
            return state
    }
}
