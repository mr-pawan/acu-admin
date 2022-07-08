import React, {useState} from 'react'
import { Badge, IconButton, Typography, Button, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, Avatar} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStyles } from '../HeaderStyle';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const dropDownArr = [
        {
            label : 'setting',
            icon : <SettingsIcon/>
        },
        {
            label : 'logout',
            icon : <LogoutIcon />
        }
    ]

    const handleMenuClick = (label) => {
      if(label === 'logout'){
          localStorage.removeItem('type');
          navigate('/login');
      }
      handleClose(); 
    }
  return (
    <div>
    <Button
      color = 'secondary'
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      startIcon = {<Avatar className={classes.navAvatar}>A</Avatar>}
    >
    </Button>
    <Menu
      id="basic-menu"handleClick
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
    {
        dropDownArr.map((item, idx) => {
            return(
                <MenuItem key = {idx} component = {ListItem} onClick={() => handleMenuClick(item.label)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                </MenuItem>

            )
        })    
    }
    </Menu>
  </div>
  )
}

export default Profile