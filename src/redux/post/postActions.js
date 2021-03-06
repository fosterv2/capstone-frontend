import { BASE_URL } from '../index'

export function fetchPosts() {
    return (dispatch) => {
        fetch(`${BASE_URL}posts`)
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
        fetch(`${BASE_URL}posts`, {
            method: "POST",
            body: body
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "ADD_POST",
            payload: post
        }))
    }
}

export function updatePost(post) {
    return (dispatch) => {
        fetch(`${BASE_URL}posts/${post.get("id")}`, {
            method: "PATCH",
            body: post
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "UPDATE_POST",
            payload: post
        }))
    }
}

export function deletePost(post_id) {
    return (dispatch) => {
        fetch(`${BASE_URL}posts/${post_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "DELETE_POST",
            payload: post
        }))
    }
}

export function likePost(user_id, post_id) {
    return (dispatch) => {
        fetch(`${BASE_URL}posts/${post_id}/likes`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            user_id: user_id
        })
        })
        .then(resp => resp.json())
        .then(post => dispatch({
            type: "LIKE_POST",
            payload: post
        }))
    }
}
