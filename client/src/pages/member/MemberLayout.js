import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import path from '../../ultils/path'
const MemberLayout = () => {
  const {isLogin,current} = useSelector(state => state.user)
  console.log({isLogin,current})
  if(!isLogin || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  return (
    <div>
      MemberLayout
      <Outlet/>
    </div>
  )
}

export default MemberLayout