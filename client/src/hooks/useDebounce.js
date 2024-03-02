import { useEffect, useState } from "react";

const useDebounce = (value,timeMs) => {
    const [debounceValue,setDebounceValue] = useState('')
    useEffect(()=> {
        const timeOutId = setTimeout(()=>{
            setDebounceValue(value)
        },[timeMs])

        return () => {
            clearTimeout(timeOutId)
        }
    },[value,timeMs])
    return debounceValue;
}
 
export default useDebounce;