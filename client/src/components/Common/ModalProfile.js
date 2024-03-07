import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { closeModalProfile } from "../../redux/features/app/appSlice";
import { logout } from "../../redux/features/user/userSlice";
import { useEffect,memo } from "react";
import { getCurrent } from "../../redux/features/user/userActions";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

const {IoMdClose} = icons
const ModalProfile = () => {
    const dispatch = useDispatch()
    const {isModalProfile} = useSelector(state => state.app)
    const {current,isLogin} = useSelector(state => state.user)
    const handleLogout = () => {
        dispatch(logout())
        dispatch(closeModalProfile())
    }

    useEffect(() => {
        if(isLogin && !current) dispatch(getCurrent())
    },[])

    return ( 
        <>
            {isModalProfile && 
            <div className="fixed flex flex-col z-[1000] animate-slide-left  top-0 bottom-0 right-0 w-[350px] bg-[#fffffff5]">
                <IoMdClose color='#ee3131' size={26} className="close hover:animate-rotate-center" onClick={()=> dispatch(closeModalProfile())}></IoMdClose>
                <h1 className="text-center uppercase tracking-[4px] p-10 mt-[60px] mx-5 border rounded-[10px] text-xl font-semibold">{current && `${current?.firstname} ${current?.lastname}`}</h1>
                <div className="mt-10 mx-5 text-sm flex-1">
                    <ul className="cursor-pointer">
                        {current?.role === 2001 && <li className="mb-5  p-4 border rounded-[10px] hover:shadow-md">
                            <Link to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                                Admin Page
                            </Link>
                        </li>}
                        <li className="mb-5 p-4 border rounded-[10px] hover:shadow-md">
                            <Link to={`/${path.MEMBER}/${path.PERSONAL}`}>
                                Personal information
                            </Link>
                        </li>
                    </ul>
                </div>
                <button 
                    onClick={handleLogout}
                    className="mx-5 mb-10 button p-4 border rounded-[10px]"
                >Logout</button>
            </div>}
        </>
        
    );
}
 
export default memo(ModalProfile);