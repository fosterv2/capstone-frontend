// import { useState } from "react";

// export function useFormInput(initialState) {
//     const [value, setValue] = useState(initialState)
//     function handleChange(event) {
//         setValue(event.target.value)
//     }
//     return {
//         value,
//         onChange: handleChange
//     }
// }

export function fetchLike(id, likes) {
    return fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            likes: likes + 1
        })
    })
    .then(resp => resp.json())
}
