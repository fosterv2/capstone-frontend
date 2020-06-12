export function fetchGroups() {
    return (dispatch) => {
        fetch("http://localhost:3000/groups")
        .then(resp => resp.json())
        .then(groups => dispatch({ type: "ADD_GROUPS", groups }))
    }
}