import { memo } from "react";

const Button = ({handleOnClick,styles,children}) => {
    return ( 
        <button
            className={styles ? styles : 'w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-primary-700 dark:focus:ring-primary-800'}
            onClick={()=>{handleOnClick && handleOnClick()}}
        >
            
            {children}
            
        </button>
     );
}
 
export default memo(Button);