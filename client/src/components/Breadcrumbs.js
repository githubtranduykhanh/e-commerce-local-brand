import { Link } from "react-router-dom";
import path from "../ultils/path";
import { capitalize } from "../ultils/helpers";

const Breadcrumbs = ({category,title}) => {
    return ( <div className="flex gap-2 text-sm text-[#1c1d1d] mb-[25px]">
        <Link to={`/${path.HOME}`}>Home</Link>
        <span>{'>'}</span>
        <Link to={`/${category?.toLowerCase()}`}>{category}</Link>
        <span>{'>'}</span>
        <span className="text-[#505050]">{capitalize(title)}</span>
    </div> );
}
 
export default Breadcrumbs;