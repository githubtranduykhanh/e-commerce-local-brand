import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { memo } from 'react'

const PagiItem = ({children,onClickItem,currentPage = 1}) => {
  
  const handlePagiItem = () => {
    onClickItem(prve => ({...prve,page:children}))
  }
  console.log('PagiItem',currentPage)
  
  return (
    <button onClick={handlePagiItem} className={clsx('w-10 h-10 flex  justify-center ',
        !Number(children) && 'items-end pb-2',
        Number(children) && 'items-center hover:rounded-full hover:bg-gray-300',
          currentPage === children && 'bg-gray-300 rounded-full'
        ) 
      }
        type='button'
        disabled={!Number(children)}
      >
      {children}
    </button>
  )
}

export default memo(PagiItem)