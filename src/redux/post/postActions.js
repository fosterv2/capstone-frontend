// export function addPost(post) {
//     return {
//         type: "ADD_POST",
//         payload: post
//     }
// }

export function fetchPosts() {
    return (dispatch) => {
        fetch("http://localhost:3000/posts")
        .then(resp => resp.json())
        .then(posts => {
            posts.sort((a, b) => {
                if (a.created_at > b.created_at) {
                    return -1
                } else if (a.created_at < b.created_at) {
                    return 1
                } else {
                    return 0
                }
            })
            dispatch({ type: "ADD_POSTS", posts })
        })
    }
}
