import { combineReducers } from "redux";
import postReducer from "./post/postReducer";
import groupReducer from "./group/groupReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    posts: postReducer,
    groups: groupReducer,
    currentUser: userReducer
})

export default rootReducer
