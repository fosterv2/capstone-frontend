export default function groupReducer(state = [], action) {
    switch (action.type) {
        case "ADD_GROUP":
            return [...state, action.payload]

        case "ADD_GROUPS":
            return action.groups

        default:
            return state
    }
}
