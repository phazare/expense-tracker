import { useState } from "react"

export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    function toggleValue(val) {
        setValue(() => !val)
    }

    return [value, toggleValue]
}