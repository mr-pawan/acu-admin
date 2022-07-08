// import React, {useState} from 'react'
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { Modal, Box, Typography, Button } from '@mui/material';
// import RegisterAgentForm from '../../Agent/RegisterAgent/RegisterAgentForm';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
// const Regsiter = () => {

//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
  
//   return (
//     <div>
//     <Button 
        
//         variant="contained" 
//         color="success"
//         startIcon={<PersonAddIcon  />}
//         onClick = {handleOpen}
//     >  
//         Register
//     </Button>
//     <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//     >
//         <Box style = {{height : '24px', width : '60px'}}>
//             <RegisterAgentForm />
//         </Box>
//     </Modal>
  
//     </div>
//   )
// }

// export default Regsiter










import React, {useState} from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Modal, Box,Button,Badge, IconButton, Typography, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, Avatar, List, Dialog} from '@mui/material';
import RegisterAgentForm from '../../Agent/RegisterAgent/RegisterAgentForm';
import { useStyles } from '../HeaderStyle';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';


const Regsiter = () => {
    const navigate = useNavigate();

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
    ];

    // handle modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (type) => {
        setOpenModal(true);
        setUserType(type);
    };
    const handleCloseModal = () => setOpenModal(false);

    // handle click

    const [userType, setUserType] = useState('');
    

    
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
          <RegisterAgentForm handleCloseModal = {handleCloseModal} userType = {userType}/>
        </Box>
      </Modal>
  </div>
  )
}

export default Regsiter