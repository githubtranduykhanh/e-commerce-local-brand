import React, { useEffect, useState } from 'react'
import { apiDeleteProduct, apiGetProduct } from '../../../apis';
import { formatPrice } from '../../../ultils/helpers';
import { Pagination,UpdatePruduct, VarriantProduct } from '../../../components';
import { useDebounce } from '../../../hooks';
import moment from 'moment';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { showModalRedux } from '../../../redux/features/app/appSlice';
import icons from '../../../ultils/icons';


const {BiCustomize,FaRegEdit,MdOutlineDeleteForever} = icons

const ManageProduct = () => {
  const dispatch = useDispatch()
  const [inputSearch,setInputSearch] = useState('')
  const [params, setParams] = useState({sort:'-createdAt'});
  const [products,setProducts] = useState(null)
  const debounceSearch = useDebounce(inputSearch,800)
  const fetchUsers = async (queryParams) => {
    const res = await apiGetProduct(queryParams)
    if(res?.success){
      if(params?.page && res?.counts < (+params?.page - 1)  * 10) {
        setParams(prve => ({...prve,page:1}))
      }
      setProducts(res)
    } 
  }

  const handleDelete = (id) =>{
    Swal.fire({
      title: "Are you detele user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      showClass: {
        popup: `
          animate-scale-up-ver-top
        `
      },
      hideClass: {
        popup: `
          animate-scale-up-ver-bottom
        `
      }
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await apiDeleteProduct(id)
        console.log(res)
        if(res?.success) {
          toast.success(res?.deletedProduct)
          setParams(prve => ({...prve}))
        }else{
          if(res?.mes) toast.error(res?.mes)
          else toast.error(res?.deletedProduct)
        }
      }
    });
  } 
  const handleEdit = (item) => {
    dispatch(showModalRedux({modalReduxChildren:<UpdatePruduct product={item} setUpdate={setParams}/>}))
  }
  const handleVarriant = (item) => {
    dispatch(showModalRedux({modalReduxChildren:<VarriantProduct product={item} setUpdate={setParams}/>}))
  }
  useEffect(()=>{
    fetchUsers(params)
  },[])
  useEffect(()=>{
    if(inputSearch !== '' && params?.page) fetchUsers({...params,search:inputSearch})
    else if(inputSearch !== '' && !params?.page) fetchUsers({search:inputSearch})
    else if(inputSearch === '' && params?.page) fetchUsers(params)
    else fetchUsers()
  },[debounceSearch])
  useEffect(()=>{
    if(params?.page && inputSearch !== '') fetchUsers({...params,search:inputSearch})
    else fetchUsers(params)
  },[params])
  return (
    <div>
       <h1 className='h-[65px]   flex justify-between items-center text-xl font-bold px-4 border-b'>
        <span>Manage Product</span>
      </h1>
      <div>
        <div className='mr-4 my-2 text-end'>
            <input onChange={(e)=>setInputSearch(e.target.value)} 
            value={inputSearch} 
            type='text' 
            placeholder='Search title, brand, category, or color...' 
            className='px-4 py-2 border rounded-md text-xs'/>
        </div>
        <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-4 py-3 w-[20px]'>#</th>
                <th className='px-4 py-3'>Thumb</th>
                <th className='px-4 py-3 w-[120px]'>Title</th>
                <th className='px-4 py-3'>Brand</th>
                <th className='px-4 py-3'>Category</th>
                <th className='px-4 py-3'>Price</th>
                <th className='px-4 py-3 text-center'>Quantity</th>
                <th className='px-4 py-3 text-center'>Sold</th>
                <th className='px-4 py-3 text-center'>Color</th>
                <th className='px-4 py-3 text-center'>Ratings</th>
                <th className='px-4 py-3 text-center'>Varriant</th>
                <th className='px-4 py-3 text-center'>CreatedAt</th>
                <th className='px-4 py-3 text-center w-[200px]'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {products?.productDatas && products?.productDatas?.map((el,index )=> (
                 <tr key={`ManageProduct-table-products-${el?._id}`} className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>
                      <img src={el?.thumb} alt={`products-thumb-${index}`} className='object-cover w-[35px] h-[35px]'/>
                    </td>
                    <td className='px-4 py-2 text-ellipsis overflow-hidden'>{el?.title}</td>
                    <td className='px-4 py-2'>{el?.brand}</td>
                    <td className='px-4 py-2'>{el?.category}</td>
                    <td className='px-4 py-2'>{formatPrice(el?.price)}</td>
                    <td className='px-4 py-2 text-center'>{el?.quantity}</td>
                    <td className='px-4 py-2 text-center'>{el?.sold}</td>
                    <td className='px-4 py-2 text-center'>{el?.color}</td>
                    <td className='px-4 py-2 text-center'>{el?.totalRatings}</td>
                    <td className='px-4 py-2 text-center'>{el?.varriants?.length || 0}</td>
                    <td className='px-4 py-2 text-center'>{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
                    <td className='px-4 py-2 '>
                      <div className='flex justify-around items-center'>
                        <button onClick={() => handleEdit(el)}  className='button edit z-50 p-2 border rounded-md'>
                          <FaRegEdit size={16}/>
                        </button>
                        <button onClick={() => handleDelete(el?._id)}  className='button delete z-50 p-2 border rounded-md'>
                          <MdOutlineDeleteForever size={16}/>
                        </button>
                        <button onClick={() => handleVarriant(el)} className='button varriant z-50 p-2 border rounded-md'>
                          <BiCustomize size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
        </table>
        <div className='text-end px-4 py-2 flex-1 border-b'>
            <Pagination totalCount={products?.counts} currentPage={params?.page} onClickItem={setParams} />
        </div>
      </div>
    </div>
    
  )
}

export default ManageProduct