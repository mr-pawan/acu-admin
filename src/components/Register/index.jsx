import React, {useState} from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { 
    Modal, 
    Box,
    Button,
    Menu, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    List
} from '@mui/material';
import { useStyles } from '../Header/HeaderStyle';
import { useNavigate } from 'react-router-dom';
import RegisterAdmin from './RegisterAdmin';
import RegisterAgent from './RegisterAgent';

const Regsiter = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [userType, setUserType] = useState('');

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // handle modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (type) => {
        setUserType(type);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    // handle click

    

    
  return (
    <div>
    <Button
    variant = 'contained'
      id="basic-button"
      aria-controls={open ? 'notification-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      color = 'success'
      startIcon = {<PersonAddIcon />}
    >
        Register
    </Button>
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
        
         <ListItem onClick={() => {handleOpenModal('admin'); handleClose()}} className = {classes.navListItem}>
            <ListItemIcon ><PersonAddIcon/></ListItemIcon>
            <ListItemText >
                Register Admin
            </ListItemText>
        
        </ListItem>
        <ListItem onClick={() => {handleOpenModal('agent'); handleClose()}}className = {classes.navListItem}>
            <ListItemIcon><PersonAddIcon/></ListItemIcon>
            <ListItemText >
                Register Agent
            </ListItemText>
        </ListItem>
    
    </List>
    </Menu>

    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
           {userType === 'admin' ?  <RegisterAdmin handleCloseModal = {handleCloseModal}/> : <RegisterAgent handleCloseModal = {handleCloseModal}/>}
        </Box>
      </Modal>
  </div>
  )
}

export default Regsiter