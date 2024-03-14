import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { capitalize } from "../../ultils/helpers";
import { memo } from "react";
const Breadcrumbs = ({category,title}) => {
    return ( <div className="flex gap-2 text-sm text-[#1c1d1d] mb-[25px]">
        <Link to={`/${path.HOME}`}>Home</Link>
        <span>{'>'}</span>
        <Link to={`/${path.COLLECTIONS}/${category?.toLowerCase()}`}>{capitalize(category)}</Link>
        {title && <>  <span>{'>'}</span>
        <span className="text-[#505050]">{capitalize(title)}</span> </>}
        
    </div> );
}
 
export default memo(Breadcrumbs);