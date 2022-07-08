import React, {useState} from 'react';
import { 
    Grid,
    Typography, 
    Paper, 
    Avatar,
    FormLabel, 
    RadioGroup, 
    Radio, 
    TextField, 
    FormControl, 
    FormControlLabel, 
    Button, 
    Box,
    CircularProgress,
    IconButton,
    Alert
} from '@mui/material';


import {styled} from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

//form validations
import {useFormik, FormikProvider, Field, Form} from 'formik';
import * as Yup from 'yup';

// Routing
import {Link} from 'react-router-dom';
import axios from 'axios';

import { api_route } from '../../Api-config/config';


const Responsive = styled("div")(({theme}) => ({
    [theme.breakpoints.down('lg')] : {
        display : 'none'
    },
    marginTop : '4rem'
   
}));


function RegisterAgent({handleCloseModal}){

    const [loading, setLoading] = useState(false);
    
    const paperStyle = {
        height: '35rem',
        width: 320,
        margin : '5rem auto',
        padding : 20

    }
    const rootStyle = {
        height : '100vh', 
        width: '100vw',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'center',
        
    }

    const avatarStyle = {
        backgroundColor : '#CE1FBD'
    }

    const inputStyle = {
        margin : '12px 0'
    }

    const btnStyle = {
        margin : '12px 0',
        backgroundColor : '#CE1FBD'
    }

    const nameStyle = {
        margin : '8px 0px',
        display : 'flex',
    }

    const cancelIconStyle = {
        display : 'flex',
        marginLeft : '17rem'
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('First name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        mobile :Yup.string()
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(8)
                .required("Mobile number is required")
      });
 

    const formik = useFormik({
        initialValues : {
            firstName : '',
            lastName : '',
            email : '',
            gender : 'male',
            mobile : '',
        },
        validationSchema : RegisterSchema,
        onSubmit : async (values, {setErrors, setSubmitting, resetForm}) => {
            try{
                setLoading(true);
                const response = await axios.post(`${api_route}/user/register`, {
                    ...values,
                    gender : values.gender.toUpperCase()
                });
                setLoading(false);

                const data = response.data;
                if(data.success){
                    // set token to local storage

                    // close the modal container
                    handleCloseModal();

                    //resetForm
                    resetForm();
                }else{
                    resetForm();
                    setErrors({afterSubmit : data.error})               
                }

            }
            catch(error){
                resetForm();
                setLoading(false);
                setErrors({afterSubmit : error.message})

            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik; 

      
   

    

  return (

        <Grid container style = {rootStyle} id = "modal-modal-title">
        
       <Grid item xs = {12} sm = {12} md = {12} lg = {6} xl = {7} > 
            <Paper elevation = {10} style = {paperStyle}>
                <Grid align = 'center'>
                   {loading && <Box ><CircularProgress /></Box>}
                    <IconButton color = 'error' style = {cancelIconStyle} onClick = {handleCloseModal}><CancelIcon/></IconButton>
                    <Avatar style = {avatarStyle}><AddCircleIcon  size='small'/></Avatar>
                    <h2>Register Agent</h2>
                    <Typography  variant = 'caption'>Please fill the from to create account</Typography>
                </Grid>
                
                <FormikProvider value = {formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                        <Grid style = {nameStyle}spacing = {2}>
                            <TextField 
                                style = {{paddingRight : '10px'}} 
                                label="First Name" 
                                variant="outlined" 
                                autoComplete="off"
                                size = 'small'
                                fullWidth 
                                required 
                                {...getFieldProps('firstName')}
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                              />
                            <TextField 
                                label="Last Name" 
                                variant="outlined" 
                                fullWidth 
                                size = 'small'
                                {...getFieldProps('lastName')}
                            />
                        </Grid>


                        <TextField 
                            style={inputStyle} 
                            label="Email address"
                            autoComplete="off" 
                            variant="outlined" 
                            fullWidth 
                            required 
                            size = 'small'
                            type = 'email'
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField 
                            style={inputStyle} 
                            label="Mobile" 
                            variant="outlined" 
                            fullWidth 
                            required 
                            size = 'small'
                            {...getFieldProps('mobile')}
                            error={Boolean(touched.mobile && errors.mobile)}
                            helperText={touched.mobile && errors.mobile}
                        />
                        <FormControl>
                            <FormLabel id="gender-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gender-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue='male'
                                    {...getFieldProps('gender')}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female"  control={<Radio />} label="Female" />
                                    <FormControlLabel value="other"   control={<Radio />} label="Other" />
                    
                                </RadioGroup>
                        </FormControl>
                   
                        <Button 
                            variant='contained' 
                            fullWidth
                            disabled = {errors.email || errors.password || loading}
                            style = {btnStyle}   
                            type = 'submit'
                        > Resgister
                        </Button>        
                       
                    </Form>
                </FormikProvider>
              
            </Paper>
        </Grid>

    </Grid> 
  
  )
}

export default RegisterAgent;