import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Expert= () => {
  return (
 <>
    <Navbar/>
   <Outlet/>
   </>
  )
}

export default Expert
