import { combineReducers } from "redux";
import postReducer from "./post/postReducer";
import groupReducer from "./group/groupReducer";

const rootReducer = combineReducers({
    posts: postReducer,
    groups: groupReducer
})

export default rootReducer
