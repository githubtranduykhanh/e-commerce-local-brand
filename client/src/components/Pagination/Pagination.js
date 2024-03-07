import React from 'react'
import { usePagination } from '../../hooks'
import { memo } from 'react'
import {PagiItem} from '../../components'
const Pagination = ({totalCount,onClickItem,currentPage = 1}) => {
  const pagination = usePagination(totalCount,currentPage)
  return (
    <div className='flex items-center justify-between'>
      <span>{`Show products ${currentPage*10 - 9} - ${(process.env.REACT_APP_PRODUCT_LIMIT || 10 * currentPage) > totalCount ? totalCount : (process.env.REACT_APP_PRODUCT_LIMIT || 10 * currentPage)} of ${totalCount}`}</span>
      <div className='flex'>
        {pagination?.map((el,index )=> (
          <PagiItem onClickItem={onClickItem}  currentPage={currentPage}  key={`PagiItem-Pagination${index}`}>
            {el}
          </PagiItem>
        ))}
      </div>
    </div>
  )
}

export default memo(Pagination)

// fist + last + current + sibling + 2*dots
// min = 6 => sibling + 5
//totalPagination : 66 , limitProduct = 10 => = 7 (66/10) = 6.6
// totalPagiItem : sibling + 5

//[]