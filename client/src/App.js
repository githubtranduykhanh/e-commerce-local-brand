import {Route,Routes} from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify';
import {Login,Home,Public,Services,DetaiProduct,Products,FAQ,Blogs,FinalRegister,ResetPassword, CollectionsCategory, Collections} from './pages/public'
import path from './ultils/path';
import {ModalRedux} from './components';
import { useSelector } from 'react-redux';
import AdminLayout from './pages/admin/AdminLayout'
import {CreateProducts} from './pages/admin/Creates'
import {Dashboard} from './pages/admin/Dashboards'
import {ManageOrder,ManageProduct,ManageUser} from './pages/admin/Manages'
import MemberLayout from './pages/member/MemberLayout'
import {Personal} from './pages/member/Personals'
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
        <Route path={path.ADMIN} element={<AdminLayout/>}>
            <Route path={path.DASHBOARD} element={<Dashboard/>}/> 
            <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/> 
            <Route path={path.MANAGE_PRODUCT} element={<ManageProduct/>}/> 
            <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
            <Route path={path.CREATE_PRODUCTS} element={<CreateProducts/>}/>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout/>}>
            <Route path={path.PERSONAL} element={<Personal/>}/> 
        </Route>
        <Route path={path.LOGIN} element={<Login/>}/>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}/>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword/>}/>
        <Route path={path.ALL} element={<div>Not Found</div>} />
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
