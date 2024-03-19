import clsx from 'clsx'
import React,{memo, useEffect, useState} from 'react'
import { IoMdClose } from 'react-icons/io'
import { toBase64 } from '../../ultils/helpers'
import { toast } from 'react-toastify'

const ImageForm = ({label,id,validate,preview,setPreview,watch,typeFile = 'single',register,errors}) => {
    const [showRemove,setShowRemove] = useState(false)
    const handlePreviewSingle = async (file) =>{
        const base64Thumb = await toBase64(file)
        setPreview(prve => ({...prve,single:base64Thumb}))
    }
    const handlePreviewList = async (files) =>{
        const imagesPreview = []
        for(let file of files) {
          if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
            toast.warning('File not supported !')
            return
          }
          const base64Image = await toBase64(file)
          imagesPreview.push({name:file?.name,path:base64Image})
        }
        setPreview(prve => ({...prve,list:imagesPreview}))
    }
    const handleRemoveSingle = () => {
        setPreview(prve => ({...prve,single:null}))
    }
    const handleRomoveList = (name) => {
        if(preview?.list[0]?.name){
          if(preview?.list?.some(el => el.name === name)) setPreview(prve => ({...prve,list:prve?.list?.filter(el => el.name !== name)}))
        }else{
          if(preview?.list?.some(el => el === name)) setPreview(prve => ({...prve,list:prve?.list?.filter(el => el !== name)}))
        }
    }
    useEffect(()=>{     
        if(watch){
            
            if(typeFile === 'single' && watch?.length > 0){
                handlePreviewSingle(watch[0])
            }else{
                handlePreviewList(watch)
            } 
        }
    },[watch])
  return (
    <div className='w-full'>
                  {label && <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='images'>{label}</label>}
                  {typeFile !== 'single' && <div className="flex items-center justify-center w-full relative"> 
                      <label htmlFor={id} className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input                        
                            id={id}
                            {...register(id,validate)} 
                            type="file" 
                            multiple 
                            className="hidden" 
                            />
                      </label>
                      {preview?.list?.length > 0 && 
                        <div className={clsx('absolute inset-0 z-20 flex flex-wrap gap-3 p-4',showRemove ? 'z-40' : '')}>
                          {preview?.list?.map((el,index)=> (       
                              <div key={`CreateProducts-preview-images-${index}`} className='w-[98px] h-[98px] relative'>
                                <img  src={el?.path || el} alt={`images-${index}`} className='w-full h-full border object-cover'/>
                                {showRemove && <div className='absolute inset-0 bg-[rgba(0,0,0,.2)]'>
                                  <span onClick={() => handleRomoveList(el?.name || el)} className='absolute top-0 right-0 cursor-pointer p-2 m-1 hover:bg-white rounded-full'><IoMdClose /></span>
                                </div>}
                              </div>
                          ))}   
                        </div>}
                        {preview?.list && <button onClick={()=>setShowRemove(prve => ({...prve,list:!prve.list}))} className='absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg' type='button'>{showRemove?.image ? 'Close' : 'Remove' }</button>}
                  </div> }
                  

                  {typeFile === 'single' && <div className="flex items-center justify-center w-full relative"> 
                      <label htmlFor={id} className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input 
                          id={id}
                          {...register(id,validate)} 
                           type="file"
                            className="hidden" />
                      </label>
                      {preview?.single && <img src={preview?.single} alt='thumbnail' className='object-contain w-[220px] h-[220px] m-auto absolute inset-0 z-20'/>}
                      {preview?.single && <button onClick={handleRemoveSingle} className='absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg' type='button'>Remove</button>}
                      {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
                  </div>}
        </div>
  )
}

export default memo(ImageForm)