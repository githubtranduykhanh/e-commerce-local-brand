import logo from '../../assets/logo.png'

import icons from '../../ultils/icons';
import { Link,useNavigate } from 'react-router-dom';
import path from '../../ultils/path'
import { useDispatch,useSelector } from 'react-redux';
import { showModalProfile } from '../../redux/features/app/appSlice';
import { memo } from 'react';
const { FaPhoneAlt,MdEmail,HiShoppingBag,FaUserCircle } = icons
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLogin} = useSelector(state => state.user)
    const handleProfile = () => {
        if(isLogin) dispatch(showModalProfile())
        else {
            navigate(`/${path.LOGIN}`)
        }
    }
    return (  
        <div className="w-main flex justify-between items-center h-[110px] py[35px]">
            <Link to={`/${path.HOME}`}>
                <img className='w-[234px] object-contain' src={logo} alt='logo' />
            </Link>
            
            
            <div className='flex text-[13px]'>
                <div className='flex flex-col items-center px-4 border-r'>
                    <span className='flex gap-4 items-center'>
                        <FaPhoneAlt color='red'/>
                        <span className='font-semibold'>(+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center px-4 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdEmail color='red'/>
                        <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                <div className='flex items-center justify-center gap-2 px-4 border-r'>
                    
                    <HiShoppingBag color='red' size={24}/>
                    <span>0 items(s)</span>
                </div>
                <div 
                    onClick={handleProfile}
                    className='flex items-center justify-center px-4 cursor-pointer' >
                    <FaUserCircle color='red' size={24}/>
                </div>
                
            </div>
        </div>
    );
}

export default memo(Header);