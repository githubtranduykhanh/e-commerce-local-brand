import {Route,Routes} from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import {Login,Home,Public,Services,DetaiProduct,Products,FAQ,Blogs,FinalRegister,ResetPassword} from './pages/public'
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
        <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}/>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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
