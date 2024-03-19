import React, { Fragment, useState, memo } from 'react'
import avatar from '../../assets/default-avatar.png'
import { memberSidebar } from '../../ultils/contants'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {FaSortDown} from 'react-icons/fa'
import path from '../../ultils/path'
import { useSelector } from 'react-redux'

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-main  text-white  rounded-md mb-2'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-main hover:text-white rounded-md mb-2'
const MemberSidebar = () => {
  const {current} = useSelector(state => state.user)  
  const [active,setActive] = useState([])
  const handelParent =(tabID)=>{
    if(active.some(item => item === tabID)) setActive(active.filter(item => item !== tabID))
    else setActive(prve => [...prve,tabID])
  }
  return (
    <div className='py-4 h-full border-r'>
      <div className='flex flex-col items-center gap-2 '>
        <Link to={`/${path.HOME}`}><img src={current?.avatar || avatar} alt='MemberSidebar-avatar' className='w-[100px] h-[100px] object-contain border rounded-md'/></Link>
        <small className='text-sm uppercase tracking-[6px]'>{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div className='mx-5 mt-5'>
        {memberSidebar.map(el => (
          <Fragment key={`MemberSidebar-memberSidebar-${el.id}`}>
              {el.type === 'SINGLE' && 
                <NavLink 
                  to={el.path}
                  className={({isActive})=> clsx(isActive && activedStyle,!isActive && notActivedStyle)}
                >
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </NavLink>}
                {el.type === 'PARENT' && <div onClick={()=>handelParent(el.id)} className='text-sm'>
                    <div className='flex items-center justify-between px-4 py-2 gap-2 hover:bg-main hover:text-white rounded-md mb-2'>
                      <div className='flex items-center gap-2'>
                        <span>{el.icon}</span>
                        <span>{el.text}</span>
                      </div>
                      <FaSortDown className={active?.some(id => id == el.id) ? 'animate-rotate-0-180' : 'animate-rotate-180-360'}/>
                    </div>
                    {active?.some(id => id == el.id) && <div className='flex flex-col '>
                      {el.submenu.map((el,index )=> (
                        <NavLink 
                          className={({isActive})=> clsx(isActive && activedStyle,!isActive && notActivedStyle,'pl-9 animate-scale-up-ver-top')}
                          to={el.path} 
                          onClick={e => e.stopPropagation()}
                          key={`MemberSidebar-memberSidebar-submenu-${index}`}
                          >
                          {el.text}
                        </NavLink>
                      ))}
                    </div>}
                  </div>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(MemberSidebar)