import {Route,Routes} from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import {Login,Home,Public,Services,DetaiProduct,Products,FAQ,Blogs,FinalRegister,ResetPassword, CollectionsCategory, Collections} from './pages/public'
import path from './ultils/path';
import ModalRedux from './components/ModalRedux';
import { useSelector } from 'react-redux';

function App() {
  const {isModalRedux,modalReduxChildren} = useSelector(state => state.app)
  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.BLOGS} element={<Blogs/>}/>
          <Route path={path.OUR_SERVICES} element={<Services/>}/>
          <Route path={path.COLLECTIONS_DETAIL_PRODUCT__CATEGOGY__PID__TITLE} element={<DetaiProduct/>}/>
          <Route path={path.COLLECTIONS__CATEGOGY} element={<CollectionsCategory/>}/>
          <Route path={path.COLLECTIONS} element={<CollectionsCategory/>}/>
          <Route path={path.PRODUCTS} element={<Products/>}/>
          <Route path={path.FAQ} element={<FAQ/>}/>
        </Route>
        <Route path={path.LOGIN} element={<Login/>}/>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}/>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword/>}/>
        <Route path='*' element={<div>Not Found</div>} />
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
      {isModalRedux && <ModalRedux>{modalReduxChildren}</ModalRedux>}
    </div>
  );
}

export default App;
