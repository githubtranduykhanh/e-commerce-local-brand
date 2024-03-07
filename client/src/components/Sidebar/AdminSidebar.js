import React, { Fragment, useState } from 'react'
import logo from '../../assets/logo.png'
import { adminSidebar } from '../../ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {FaSortDown} from 'react-icons/fa'

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-main  text-white  rounded-xl mb-2'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-main hover:text-white rounded-xl mb-2'
const AdminSidebar = () => {
  const [active,setActive] = useState([])
  const handelParent =(tabID)=>{
    if(active.some(item => item === tabID)) setActive(prve => active.filter(item => item !== tabID))
    else setActive(prve => [...prve,tabID])
  }
  return (
    <div className='py-4 h-full'>
      <div className='flex flex-col items-center gap-2 '>
        <img src={logo} alt='AdminSidebar-logo' className='object-contain'/>
        <small>Admin Workspage</small>
      </div>
      <div className='mx-5 mt-2'>
        {adminSidebar.map(el => (
          <Fragment key={`AdminSidebar-adminSidebar-${el.id}`}>
              {el.type === 'SINGLE' && 
                <NavLink 
                  to={el.path}
                  className={({isActive})=> clsx(isActive && activedStyle,!isActive && notActivedStyle)}
                >
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </NavLink>}
                {el.type === 'PARENT' && <div onClick={()=>handelParent(el.id)} className='text-sm'>
                    <div className='flex items-center justify-between px-4 py-2 gap-2 hover:bg-main hover:text-white rounded-xl mb-2'>
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
                          key={`AdminSidebar-adminSidebar-submenu-${index}`}
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

export default AdminSidebar