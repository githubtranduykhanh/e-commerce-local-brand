import React,{memo, useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import MarkdownEditor from '../Input/MarkdownEditor'
import SelectForm from '../Input/SelectForm'
import { InputFrom, Loading } from '..'
import { toBase64 } from '../../ultils/helpers'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { IoMdClose } from 'react-icons/io'
import { apiPutUpdateProduct } from '../../apis'
import { closeModalRedux } from '../../redux/features/app/appSlice'

function UpdatePruduct({product,setUpdate}) {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.app)
  const [isloading,setIsLoading] = useState(false)
  const [payload,setPayload] = useState({description:typeof product?.description === 'object' ? product?.description?.join(', ') : product?.description})
  const [invalidFields,setInvalidFields] = useState([])
  const [showRemove,setShowRemove] = useState({thumb:false,image:false})
  const [preview,setPreview] = useState({
    thumb:product?.thumb,
    images:product?.images
  })
  const { register, handleSubmit, setValue, getValues, formState: { errors },watch,reset }= useForm({
    defaultValues:{
      category: categories.filter(el => el?.title === product?.category)[0]?._id,
      title:product?.title,
      color:product?.color,
      price:product?.price,
      quantity:product?.quantity,
      brand:product?.brand, 
    }
  })
  const onSubmit = async (data) => {
    if(data?.category) data.category = categories?.find(el => el?._id === data?.category)?.title
    const finalPayload = {...data,...payload}
    const formData = new FormData()
    for(let i of Object.entries(finalPayload)){
      if(i[0] === 'thumb'){
        if(i[1]?.length > 0){
          formData.append('thumb',finalPayload?.thumb[0])
        }else{
          formData.append('thumb',preview?.thumb)
        }
        continue
      }
      if(i[0] === 'images'){
        if(i[1]?.length > 0){
          
          for(let image of finalPayload?.images) formData.append('images',image)
        }else{
          
          for(let image of preview?.images) formData.append('images',image)
        }
        continue
      }
      if(i[0] === 'title'){
        formData.append('title',finalPayload?.title?.toUpperCase())
        continue
      }
      if(i[0] === 'brand'){
        formData.append('brand',finalPayload?.brand?.toUpperCase())
        continue
      }
      
      formData.append(i[0],i[1])
    } 
    // for(let item of formData.entries()){
    //   console.log(item[0]+': '+item[1])
    // }
    setIsLoading(true)
    const res = await apiPutUpdateProduct(formData,product?._id)
    setIsLoading(false)
    if(res?.success){
      toast.success(res?.mes)
      setUpdate(prve => ({...prve}))
      dispatch(closeModalRedux())
    } 
    else toast.error(res?.mes)
  }
  const changeValue = useCallback((e) => {
    setPayload(e)
  },[payload])
  const handlePreviewThumb = async (file) =>{
    const base64Thumb = await toBase64(file)
    setPreview(prve => ({...prve,thumb:base64Thumb}))
  }
  const handlePreviewImages = async (files) =>{
    const imagesPreview = []
    for(let file of files) {
      if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
        toast.warning('File not supported !')
        return
      }
      const base64Image = await toBase64(file)
      imagesPreview.push({name:file?.name,path:base64Image})
    }
    setPreview(prve => ({...prve,images:imagesPreview}))
  }
  const handleRemoveThumb = () => {
      setPreview(prve => ({...prve,thumb:null}))
  }
  const handleRomoveImages = (name) => {
    if(preview?.images[0]?.name){
      if(preview?.images?.some(el => el.name === name)) setPreview(prve => ({...prve,images:prve?.images?.filter(el => el.name !== name)}))
    }else{
      if(preview?.images?.some(el => el === name)) setPreview(prve => ({...prve,images:prve?.images?.filter(el => el !== name)}))
    }
  }
  useEffect(() =>{
    if(watch('thumb').length > 0){
      handlePreviewThumb(watch('thumb')[0])
    } 
  },[watch('thumb')]) 
  useEffect(() =>{
    if(watch('images').length > 0){
      handlePreviewImages(watch('images'))
    } 
  },[watch('images')]) 
  // useEffect(() =>{
  //   console.log(watch('brand'),watch('category'))
  //   setValue('brand',categories?.find(el => el?._id === watch('category'))?.brand[0]?.toUpperCase())
  // },[watch('category')]) 
  
  return (
    <div className='text-sm h-[600px] w-[1200px] animate-slide-top shadow-2xl p-4 border bg-white'>
      <h2 className='text-lg font-bold p-3 border-b'> 
        Edit infomation
      </h2>
      <div className='overflow-y-scroll w-full h-[500px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex gap-3 items-center my-3'>
                <InputFrom 
                    className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    register={register}
                    errors={errors}
                    id='title'
                    validate={{required: 'Title cannot be blank',}}
                    placeholder='Title...'
                    lable='Title'
                />
                <InputFrom 
                    className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    register={register}
                    errors={errors}
                    id='price'
                    type='number'
                    validate={{required: 'Price cannot be blank',}}
                    placeholder='Price...'
                    lable='Price'
                />
                <InputFrom 
                    className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    register={register}
                    errors={errors}
                    id='quantity'
                    type='number'
                    validate={{required: 'Quantity cannot be blank',}}
                    placeholder='Quantity...'
                    lable='Quantity'
                />
              </div>
              <div className='flex gap-3 items-center my-3'>
                  <InputFrom 
                      className='flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                      register={register}
                      errors={errors}
                      id='color'
                      validate={{required: 'Color cannot be blank',}}
                      placeholder='Color...'
                      lable='Color'
                  />
                  <SelectForm 
                    className='cursor-pointer flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    register={register}
                    id='category'
                    lable='Category'
                    listOption={categories?.map(el => ({value:el?._id,text:el?.title}))}
                  />
                  <SelectForm 
                    className='cursor-pointer flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    register={register}
                    id='brand'
                    lable='Brand'
                    listOption={categories?.find(el => el?._id === watch('category'))?.brand?.map((item)=> ({value:item?.toUpperCase(),text:item}))}
                  />
              </div>
              <div className='my-3'>
                <MarkdownEditor
                  name='description'
                  lable='Description'
                  changeValue={changeValue}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  value={payload?.description}
                  height={400}
                />
              </div>
              <div className='flex items-center gap-3 my-3'>
                <div className='w-full'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='thumb'>Thumb</label>
                  <div className="flex items-center justify-center w-full relative"> 
                      <label htmlFor="thumb" className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="thumb" {...register('thumb')} type="file" className="hidden" />
                      </label>
                      {preview?.thumb && <img src={preview?.thumb} alt='thumbnail' className='object-contain w-[220px] h-[220px] m-auto absolute inset-0 z-20'/>}
                      {preview?.thumb && <button onClick={handleRemoveThumb} className='absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg' type='button'>Remove</button>}
                  </div> 
                  {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                </div>
                <div className='w-full'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='images'>Images</label>
                  <div className="flex items-center justify-center w-full relative"> 
                      <label htmlFor="images" className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="images" {...register('images')}  type="file" multiple className="hidden" />
                      </label>
                      {preview?.images?.length > 0 && 
                        <div className={clsx('absolute inset-0 z-20 flex flex-wrap gap-3 p-4',showRemove?.image ? 'z-40' : '')}>
                          {preview?.images?.map((el,index)=> (       
                              <div key={`CreateProducts-preview-images-${index}`} className='w-[98px] h-[98px] relative'>
                                <img  src={el?.path || el} alt={`images-${index}`} className='w-full h-full border object-cover'/>
                                {showRemove?.image && <div className='absolute inset-0 bg-[rgba(0,0,0,.2)]'>
                                  <span onClick={() => handleRomoveImages(el?.name || el)} className='absolute top-0 right-0 cursor-pointer p-2 m-1 hover:bg-white rounded-full'><IoMdClose /></span>
                                </div>}
                              </div>
                          ))}   
                        </div>}
                        {preview?.images && <button onClick={()=>setShowRemove(prve => ({...prve,image:!prve.image}))} className='absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg' type='button'>{showRemove?.image ? 'Close' : 'Remove' }</button>}
                  </div> 
                  {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                </div>
              </div>
              <div className='text-end  w-full bg-white items-center'>
                <button type='submit' className='min-w-[130px] button p-4 border rounded-[10px]'>
                  Create new product
                </button>
              </div>
        </form>
      </div>
      {isloading && <Loading/>}
    </div>
  )
}

export default memo(UpdatePruduct)