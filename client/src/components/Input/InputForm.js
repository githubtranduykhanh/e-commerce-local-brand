import React,{memo} from 'react'

const InputFrom = ({className,lable, disabled, register, errors, id, validate, type = 'text', placeholder}) => {
  return (
    <div className='w-full'>
        {lable && <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>{lable}</label>}
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            id={id}
            {...register(id,validate)}
        />
        {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(InputFrom)