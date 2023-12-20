import logo from '../assets/logo.png'
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path'
const { FaPhoneAlt,MdEmail,HiShoppingBag,FaUserCircle } = icons
const Header = () => {
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
                <div className='flex items-center justify-center px-4'>
                    <FaUserCircle color='red' size={24}/>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Header;