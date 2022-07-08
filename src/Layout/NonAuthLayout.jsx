import React from 'react'
import { Outlet } from 'react-router-dom'
const NonAuthLayout = ({children}) => {
  return (
    <>
       {children}
    </>
  )
}

export default NonAuthLayout