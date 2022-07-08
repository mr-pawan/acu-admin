import { blue } from '@mui/material/colors';
import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    logo : {
        color : 'white'
    },

    //Navbar
    toolbar : {
        display : 'flex',
        flexFlow : 'row wrap',
        justifyContent : 'space-between',
        
    },
    navList: {
        minWidth : '250px',
        maxWidth : '300px'
    }, 
    navListItem : {
       '&:hover' : {
        cursor : 'pointer',
        backgroundColor : '#f4f4f4'
       }
    },
    navAvatar : {
        height : '35px',
        width : '35px'
    },
    ulAvatar : {
        backgroundColor : blue['A200'],
        color:'white'
    },

    //Sidebar
    sideBar : {
        marginTop : '2rem'
    },
    sideBarActive : {
        backgroundColor : '#f4f4f4',
        color :'blue'
    },
    sideBarIconActive : {
        color : '#f50057'
    },

    //layout component
    drawerPaper: {
        width: "240px",
        marginTop: "63px",
        
      },
}))


