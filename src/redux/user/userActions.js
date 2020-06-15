export function setUser(user) {
    return {
        type: "SET_USER",
        payload: user
    }
}

export function clearUser() {
    return {
        type: "CLEAR_USER"
    }
}

export function updateUser(user) {
    return dispatch => {
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(user => dispatch({
            type: "SET_USER",
            payload: user
        }))
    }
}
