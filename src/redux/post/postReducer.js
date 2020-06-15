// const initialState = {
//     posts: []
// }

export default function postReducer(state = [], action) {
    switch (action.type) {
        case "ADD_POST":
            return [action.payload, ...state]

        case "UPDATE_POST":
        case "DELETE_POST":
        case "LIKE_POST":
            return state.map(post => post.id === action.payload.id ? action.payload : post)

            // return state

        // case "_POST":
        //     return

        // case "_POST":
        //     return

        case "ADD_POSTS":
            return action.posts

        default:
            return state
    }
}
