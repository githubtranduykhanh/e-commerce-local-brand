import React from 'react'
import { usePagination } from '../hooks'
import {PagiItem} from './'
const Pagination = ({totalCount}) => {
  const pagination = usePagination(66,2)
  return (
    <div className='flex' >{
      pagination?.map(el => (
        <PagiItem key={`PagiItem-Pagination${el}`}>
          {el}
        </PagiItem>
      ))
    }</div>
  )
}

export default Pagination

// fist + last + current + sibling + 2*dots
// min = 6 => sibling + 5
//totalPagination : 66 , limitProduct = 10 => = 7 (66/10) = 6.6
// totalPagiItem : sibling + 5

//[]