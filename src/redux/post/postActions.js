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
            dispatch({
                type: "ADD_POSTS",
                posts
            })
        })
    }
}

export function addPost(body) {
    return (dispatch) => {
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "ADD_POST",
            payload: post
        }))
    }
    // return {
    //     type: "ADD_POST",
    //     payload: post
    // }
}

export function updatePost(post) {
    return (dispatch) => {
        fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            content: "This post has been deleted",
            post_url: "",
            deleted: true
        })
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "UPDATE_POST",
            payload: post
        }))
    }
    // return {
    //     type: "UPDATE_POST",
    //     payload: post
    // }
}

export function deletePost(post) {
    return (dispatch) => {
        fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            content: "This post has been deleted",
            post_url: "",
            deleted: true
        })
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "DELETE_POST",
            payload: post
        }))
    }
    // return {
    //     type: "DELETE_POST",
    //     payload: id
    // }
}

export function likePost(id) {
    return {
        type: "LIKE_POST",
        payload: id
    }
}
