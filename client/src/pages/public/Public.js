import {Outlet} from 'react-router-dom'
import {Header,Navigation,TopHeader,Footer,ModalProfile,ModalDetail} from '../../components'
const Public = () => {
    return (  
        <div className='w-full flex flex-col items-center'>
            <TopHeader/>
            <Header/>
            <Navigation/>
            <div className='w-main'>
            <Outlet/>
            </div>
            <Footer/>
            <ModalProfile/>
            <ModalDetail/>
        </div>
    );
}

export default Public;