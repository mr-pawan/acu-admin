import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import {
  Box
} from '@mui/material';

const AuthLayout = ({children}) => {
  return (
    <>
       <HeaderComponent />
       <Box sx = {{ 
        marginLeft : {xs : '0px', sm : '240px'},
      }}
      >
        {children}
    </Box>
    </>
  )
}

export default AuthLayout