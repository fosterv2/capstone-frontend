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
