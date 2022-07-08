import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DifferenceIcon from '@mui/icons-material/Difference';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GroupIcon from '@mui/icons-material/Group';
import PercentIcon from '@mui/icons-material/Percent';
import { useStyles } from './HeaderStyle';
import { useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';


export const drawerWidth = 240;



function Sidebar({handleDrawerToggle, mobileOpen}) {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();


  const lists = [
    {
      label : 'Dashboard',
      icon : <DashboardIcon color='secondary'/>,
      link : '/admin/dashboard'
  },
    {
        label : 'All Agents',
        icon : (<GroupIcon color='secondary'/>),
        link : '/admin/all-agents'
    },
    
]

  const drawer = (
    <div>
        
      <List>
        {lists.map((item, index) => (
          <ListItem 
            
            key={item.label} 
            disablePadding 
            className = {location.pathname == item.link ? classes.sideBarActive : null}
            onClick = {() => {navigate(item.link); handleDrawerToggle(item.link)}}
        >
            <ListItemButton>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );


    return ( 
        
          <Box
            component="nav"
            // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, marginTop : '65px' }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              classes = {{
                paper : classes.drawerPaper
              }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },

              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              classes = {{
                paper : classes.drawerPaper
              }}
                variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
              open
            >
              {drawer}
            </Drawer>
            </Box>
         
      );
    
}





export default Sidebar;

         