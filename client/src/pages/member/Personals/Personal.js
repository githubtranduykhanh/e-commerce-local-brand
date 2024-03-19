import React, { useEffect, useState } from 'react'
import { ImageForm, InputFrom, Loading } from '../../../components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatars from '../../../assets/default-avatar.png'
import { roles } from '../../../ultils/contants'
import moment from 'moment'
import { apiPutCurrent } from '../../../apis'
import {getCurrent} from '../../../redux/features/user/userActions'
import { toast } from 'react-toastify'
const Personal = () => {
  const dispatch = useDispatch()
  const {current} = useSelector(state => state.user)
  const [isLoading,setIsLoading] = useState(false)
  const [avatarPreview,setAvatarPreview] = useState({single:current?.avatar || avatars})
  const { register, handleSubmit, setValue, getValues, formState: { errors,isDirty },watch,reset }= useForm({
    defaultValues: {
      firstname: current?.firstname,
      lastname:current?.lastname,
      email:current?.email,
      mobile:current?.mobile,
    }
  })
  
  const onSubmit = async (data) => {
    //const {avatar} = data
    if(data?.avatar && data?.avatar?.length > 0) data.avatar = data.avatar[0]
    else data.avatar = avatarPreview?.single
    const formData = new FormData()
    for(let i of Object.entries(data)){
      formData.append(i[0],i[1])
    } 
    setIsLoading(true)
    const res =  await apiPutCurrent(formData)
    setIsLoading(false)
    if(res?.success){
      toast.success(res?.mes)
      dispatch(getCurrent())
    } 
    else toast.error(res?.mes)
  }
  return (
    <div className='px-10 pt-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='w-[400px] h-[300px] text-center m-auto'>
            <ImageForm 
              id='avatar' 
              register={register}
              errors={errors}
              label='Avatar'
              watch={watch('avatar')}
              typeFile='single'
              preview={avatarPreview}
              setPreview={setAvatarPreview}
            />
          </div>
        </div>
        <div className='mt-7 mx-[200px]'>
          <div className='flex items-center gap-10 my-3'>
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
              
            </div>
            <div className='flex items-center gap-10 my-3'>
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
            </div>
            <div className='flex flex-col gap-3 mt-7 text-sm'>
                <span className='font-bold'>Account status: <span className='font-normal'>{current?.isBlocked ? 'Blocked' : 'Active'}</span></span>
                <span className='font-bold'>Role: <span className='font-normal'>{roles.find(role => role.code === current?.role).value}</span></span>
                <span className='font-bold'>Created At: <span className='font-normal'>{moment(current?.createdAt).format('DD/MM/YYYY')}</span></span>               
            </div>
            <div className='text-end mt-5 w-full bg-white items-center'>
                <button type='submit' disabled={!isDirty} className='min-w-[130px] z-50 button p-4 border rounded-[10px]'>
                    Update infomation
                </button>
            </div>
        </div>
        
      </form>
      {isLoading && <Loading/>}
    </div>
  )
}

export default Personal