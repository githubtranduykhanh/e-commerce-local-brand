import React from 'react'
import avatar from '../../assets/default-avatar.png'
import moment from 'moment'
import {renderStarFromNumber} from '../../ultils/helpers'
const Comment = ({image = avatar,name = 'Anonymous',comment,updateAt,star}) => {
  return (
    <div className='flex gap-4'>
        <div className='flex-none'>
            <img className='w-[25px] h-[25px] object-cover rounded-full' src={image} alt='avatar'/>
        </div>
        <div className='flex  flex-col flex-auto '> 
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold'>{name}</h3>
                <span className='text-xs italic'>{moment(updateAt)?.fromNow()}</span>
            </div>
            <div className='flex flex-col gap-2 pl-4 text-sm mt-4 border border-gray-300  py-2 bg-gray-100'>
                <span className='flex items-center gap-1'>
                    <span className='font-semibold'>Vote:</span>
                    <span className='flex items-center gap-1'>
                        {renderStarFromNumber(star)?.map((el,index) => (
                            <span key={`renderStarFromNumber-Comment-${name}-${index}`}>{el}</span>
                        ))}
                    </span>
                </span>
                <span className='flex items-center gap-1'>
                    <span className='font-semibold'>Comment:</span>
                    <span className='flex gap-1'>
                        {comment}
                    </span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Comment