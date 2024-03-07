import { memo } from "react";
const InputFiled = ({value, setValue, nameKey, type, invalidFiled, setInvalidFiled, name}) => {
    return ( 
        <div className="w-full">
            <input
                name={name}
                type={type || 'text'}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                placeholder={nameKey.slice(0,1).toUpperCase() + nameKey.slice(1)}
                onChange={e => setValue(prev => ({...prev,[nameKey]:e.target.value}))}
            />
        </div>
     );
}
 
export default memo(InputFiled);