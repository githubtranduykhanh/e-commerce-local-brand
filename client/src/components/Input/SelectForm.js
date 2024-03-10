import React,{memo} from 'react'

const SelectForm = ({className,lable, register, id ,listOption}) => {
  return (
    <div className='w-full'>
        {lable && <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>{lable}</label>}
        <select  
            className={className}
            id={id}
            {...register(id)}
            >
            {listOption && listOption?.map(el => (
                <option key={`SelectForm-listOption-${el?.value}`} className='cursor-pointer' value={el?.value}>{el?.text}</option>
            ))}          
      </select>
    </div>
  )
}

export default memo(SelectForm)