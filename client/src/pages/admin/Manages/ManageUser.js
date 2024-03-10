import React, { useEffect, useState } from 'react'
import {apiDeleteUser, apiGetUsers} from '../../../apis/user'
import { roles } from '../../../ultils/contants'
import {useDebounce} from '../../../hooks'
import {EditForm, Pagination} from '../../../components'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { showModalRedux } from '../../../redux/features/app/appSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
function ManageUser() {
  const dispatch = useDispatch()
  const [params, setParams] = useState({});
  const [users,setUsers] = useState(null)
  const [inputSearch,setInputSearch] = useState('')
  const debounceSearch = useDebounce(inputSearch,800)
  const fetchUsers = async (queryParams) => {
      const res = await apiGetUsers(queryParams)
      if(res?.success){
        if(params?.page && res?.counts < (+params?.page - 1)  * 10) {
          setParams(prve => ({...prve,page:1}))
        }
        setUsers(res)
      } 
  }
  const handleEdit = (el) => {
    dispatch(showModalRedux({modalReduxChildren:<EditForm user={el} setUpdate={setUsers}/>}))
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
        const res = await apiDeleteUser(id)
        console.log(res)
        if(res?.success) {
          toast.success(res?.deletedUser)
          setParams(prve => ({...prve}))
        }else{
          if(res?.mes) toast.error(res?.mes)
          else toast.error(res?.deletedUser)
        }
      }
    });
  } 
  useEffect(()=>{
    fetchUsers()
  },[])
  useEffect(()=>{
    if(inputSearch !== '' && params?.page) fetchUsers({...params,searchPhoneEmail:inputSearch})
    else if(inputSearch !== '' && !params?.page) fetchUsers({searchPhoneEmail:inputSearch})
    else if(inputSearch === '' && params?.page) fetchUsers(params)
    else fetchUsers()
  },[debounceSearch])
  useEffect(()=>{
    if(params?.page && inputSearch !== '') fetchUsers({...params,searchPhoneEmail:inputSearch})
    else fetchUsers(params)
  },[params])
  return (
    <div>
      <h1 className='h-[65px]   flex justify-between items-center text-xl font-bold px-4 border-b'>
        <span>ManageUser</span>
      </h1>
      <div>
        <div className='mr-4 my-2 text-end'>
          <input onChange={(e)=>setInputSearch(e.target.value)} 
          value={inputSearch} 
          type='text' 
          placeholder='Search phone or email...' 
          className='px-4 py-2 border rounded-md text-xs'/>
        </div>
        <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-4 py-3'>#</th>
                <th className='px-4 py-3'>Email</th>
                <th className='px-4 py-3'>Fullname</th>
                <th className='px-4 py-3'>Role</th>
                <th className='px-4 py-3'>Phone</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3'>Created At</th>
                <th className='px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {users?.users && users?.users?.map((el,index )=> (
                 <tr key={`ManageUser-table-users-${el?._id}`} className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>{el?.email}</td>
                    <td className='px-4 py-2'>{`${el?.firstname} ${el?.lastname}`}</td>
                    <td className='px-4 py-2'>{roles.find(role => role.code === el?.role).value}</td>
                    <td className='px-4 py-2'>{el?.mobile}</td>
                    <td className='px-4 py-2'>{el?.isBlocked ? 'Blocked' : 'Active'}</td>
                    <td className='px-4 py-2'>{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
                    <td className='px-4 py-2 flex justify-between items-center'>
                      <button onClick={()=>handleEdit(el)} className='button edit z-50 p-2 border rounded-md'>
                        Edit
                      </button>
                      <button onClick={()=>handleDelete(el?._id)} className='button delete z-50 p-2 border rounded-md'>
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
        </table>
        <div className='text-end px-4 py-2 flex-1 border-b'>
            <Pagination totalCount={users?.counts} currentPage={params?.page} onClickItem={setParams} />
        </div>
      </div>
    </div>
  )
}

export default ManageUser