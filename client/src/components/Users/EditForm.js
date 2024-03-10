import React,{memo} from 'react'
import { useForm } from "react-hook-form";
import {InputFrom,SelectForm} from '../../components'
import {roleSelect,statusSelect} from '../../ultils/contants'
import { useDispatch } from 'react-redux';
import { closeModalRedux } from '../../redux/features/app/appSlice';
import { apiUpdateUser } from '../../apis';
import { toast } from 'react-toastify';

const EditForm = ({user,setUpdate}) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    firstname: '',
    lastname:'',
    email:'',
    mobile:'',
    role:'',
    isBlocked:'',
    defaultValues: {
      firstname: user?.firstname,
      lastname:user?.lastname,
      email:user?.email,
      mobile:user?.mobile,
      role:user?.role,
      isBlocked:user?.isBlocked,
    }
  });
  const onSubmit = async data => {
    const res =  await apiUpdateUser(data,user?._id)
    if(res?.success){
      setUpdate(prve => ({...prve,users:prve?.users?.map(item => item?._id === user?._id ? res?.updatedUser : item)}))
      dispatch(closeModalRedux())
      toast.success('Update user successful')
    } else toast.error(res?.mes)
    
    //prve?.map(item => item?._id === user?._id ? res?.updatedUser : item)
  };
  return (
    <div className='w-[900px] text-sm animate-slide-top shadow-2xl border bg-white'>
      <h2 className='text-lg font-bold p-3 border-b'> 
        Edit infomation
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-5'>
          <div className='flex items-center gap-3 my-3'>
            <InputFrom 
              className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
              register={register}
              errors={errors}
              id='firstname'
              validate={{required: 'Firstname cannot be blank',}}
              placeholder='Firstname...'
              lable='Firstname'
             />
            <InputFrom 
              className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
              register={register}
              errors={errors}
              id='lastname'
              validate={{required: 'Lastname cannot be blank'}}
              placeholder='Lastname...'
              lable='Lastname'
             />
             <InputFrom 
             className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
             register={register}
             errors={errors}
             id='email'
             validate={{
              required: 'Email cannot be blank',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            }}
             placeholder='Email...'
             lable='Email'
            />
          </div>
          <div className='flex items-center gap-3 my-3'>
            <InputFrom 
              className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
              register={register}
              errors={errors}
              id='mobile'
              validate={{
                required: 'Phone cannot be blank',
                pattern: {
                  value: /^[62|0]+\d{9}/gi,
                  message: "invalid phone number"
                }
              }}
              placeholder='Phone...'
              lable='Phone'
             />
            <SelectForm 
              className='cursor-pointer flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
              register={register}
              id='role'
              lable='Role'
              listOption={roleSelect}
             />
             <SelectForm 
             className='cursor-pointer flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
             register={register}      
             id='isBlocked'
             lable='Status'
             listOption={statusSelect}
            />
          </div>
        </div>
        <div className='text-end mx-5 mb-5 items-center'>
          <button type='button' onClick={()=>dispatch(closeModalRedux())} className='mr-4  min-w-[130px] button-cancel p-4 border rounded-[10px]'>
            Cancel
          </button>
          <button type='submit' className='min-w-[130px] button p-4 border rounded-[10px]'>
            Send
          </button>
        </div>
      </form>
     
    </div>
  )
}

export default memo(EditForm)