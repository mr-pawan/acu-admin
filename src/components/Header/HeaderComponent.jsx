import React, {useState} from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const HeaderComponent = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = (link) => {
      setMobileOpen(!mobileOpen);
    }
  return (
    <>
        <Navbar handleDrawerToggle = {handleDrawerToggle}/>
        <Sidebar handleDrawerToggle={handleDrawerToggle} mobileOpen = {mobileOpen}/>
        

        
    </>
    
  )
}

export default HeaderComponent