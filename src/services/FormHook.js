import { useState } from "react";

export function useFormInput(initialState) {
    const [value, setValue] = useState(initialState)
    function handleChange(event) {
        setValue(event.target.value)
    }
    return {
        value,
        onChange: handleChange
    }
}
