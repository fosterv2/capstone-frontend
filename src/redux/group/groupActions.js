export function fetchGroups() {
    return (dispatch) => {
        fetch("http://localhost:3000/groups")
        .then(resp => resp.json())
        .then(groups => dispatch({ type: "ADD_GROUPS", groups }))
    }
}

export function addGroup(body) {
    return (dispatch) => {
        fetch("http://localhost:3000/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(group => dispatch({
            type: "ADD_GROUP",
            payload: group
        }))
    }
}

export function joinGroup(user_id, group_id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${user_id}/groups`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                group_id: group_id,
            })
        })
        .then(resp => resp.json())
        .then(group => dispatch({
            type: "UPDATE_GROUP",
            payload: group
        }))
    }
}

export function leaveGroup(user_id, group_id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${user_id}/groups`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                group_id: group_id,
            })
        })
        .then(resp => resp.json())
        .then(group => dispatch({
            type: "UPDATE_GROUP",
            payload: group
        }))
    }
}
