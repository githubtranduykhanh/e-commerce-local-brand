import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/features/app/appActions";
import path from "../../ultils/path";

const Sidebar = () => {
    const dispatch = useDispatch()
    const { categories,isLoading,errorMessage } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(getCategories())
    },[dispatch])

    if(isLoading) return <div>Loading...</div>;
    if (errorMessage) return <div>Error: {errorMessage}</div>;
        
    return (  
        <div className="flex flex-col border h-[52%]">
            
            {categories?.map(el => (
                <NavLink className='px-5 pt-[15px] pb-[14px] text-sm hover:text-main' key={el?._id} to={`/${path.COLLECTIONS}/${createSlug(el?.title)}`}>{el?.title}</NavLink>
            ))}
            
        </div>
    );
}

export default Sidebar;