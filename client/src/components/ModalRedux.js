import { memo } from "react";
import icons from "../ultils/icons";
import { useDispatch } from "react-redux";
import { closeModalRedux } from "../redux/features/app/appSlice";
const {IoMdClose} = icons
const ModalRedux = ({children}) => {
    const dispatch = useDispatch()
    return ( <div className="fixed flex inset-0 bg-[#ffffff90]">
        <IoMdClose color='#ee3131' size={26} className="close hover:animate-rotate-center" onClick={()=> dispatch(closeModalRedux())}></IoMdClose>
        <div className="m-auto">
            {children}
        </div>
    </div> );
}
 
export default memo(ModalRedux);