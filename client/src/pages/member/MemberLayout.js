import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import path from '../../ultils/path'
import { MemberSidebar } from '../../components'
const MemberLayout = () => {
  const {isLogin,current} = useSelector(state => state.user)
  if(!isLogin || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  return (
    <div  className='flex w-full min-h-screen'>
      <div className='w-[327px] fixed top-0 bottom-0'>
        <MemberSidebar/>
      </div>
      <div className='flex-1 ml-[327px]'>
          <Outlet/>    
      </div>
    </div>
  )
}

export default MemberLayout