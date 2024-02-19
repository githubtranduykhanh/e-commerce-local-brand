import {Route,Routes} from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import {Login,Home,Public,Services,DetaiProduct,Products,FAQ,Blogs} from './pages/public'
import path from './ultils/path';

function App() {
  
  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.BLOGS} element={<Blogs/>}/>
          <Route path={path.OUR_SERVICES} element={<Services/>}/>
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetaiProduct/>}/>
          <Route path={path.PRODUCTS} element={<Products/>}/>
          <Route path={path.FAQ} element={<FAQ/>}/>
        </Route>
        <Route path={path.LOGIN} element={<Login/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
