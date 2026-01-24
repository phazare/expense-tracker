import { useEffect, useState } from "react"

export const useDebounce = (searchValue, delay) => {
    const [value, setValue] = useState(searchValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(searchValue)
        }, delay)

        return () => clearTimeout(timer)
    }, [searchValue, delay]);

    return value
}