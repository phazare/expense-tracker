import { useState, useEffect } from "react";
export const useLocalStorage = (key, initialValue = []) => {
    const [value, setValue] = useState(() => {
        const exist = localStorage.getItem(key);
        return exist ? JSON.parse(exist) : initialValue
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    function setLocalStorage(newData) {
        setValue(newData)
    }
    return [value, setLocalStorage]
}