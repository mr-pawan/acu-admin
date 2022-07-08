import React, {useState} from 'react'
import { Badge, IconButton, Typography, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, Avatar, List} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { useStyles } from '../HeaderStyle';

const Notification = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dropDownArr = [
       {
        label : 'Admin',
        desc : 'new offers of policy'
       },
       {
        label : 'Agent1',
        desc : 'some text to you'
       }
    ]
  return (
    <div>
    <IconButton
      color = 'secondary'
      id="basic-button"
      aria-controls={open ? 'notification-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      color = 'inherit'
    >
         <Badge badgeContent={4} color="error">
            <NotificationsIcon  />
        </Badge>
    </IconButton>
    <Menu
      id="notification-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
    <List className = {classes.navList}>    
    {   
        dropDownArr.map((item, idx) => {
            return(
                <ListItem key = {idx} onClick={handleClose} className = {classes.navListItem}>
                    <ListItemIcon>
                        <Avatar className = {classes.ulAvatar} >
                        {item.label[0].toUpperCase()}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                        primary = {item.label}
                        secondary = {item.desc}
                    >
                    </ListItemText>
                </ListItem>

            )
        })    
    }
    </List>
      {/* <MenuItem onClick={handleClose}>Profile Hai</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
    </Menu>
  </div>
  )
}

export default Notification