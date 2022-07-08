import React, { useState } from 'react';
// MUI Elements
import { 
  Grid, 
  Typography, 
  Paper, 
  Avatar, 
  TextField, 
  IconButton, 
  InputAdornment,
  Checkbox, 
  FormControlLabel, 
  Button,
  Alert,
  LinearProgress,
  Box
} from '@mui/material';

// import LinearProgress from '@mui/material/LinearProgress';


// Login Side Image
import loginImg from '../../../Assets/background/login.svg';

// styles components mui
import { styled} from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';



// form validations
import {useFormik, FormikProvider, Field, Form} from 'formik';
import * as Yup from 'yup';

// iconify element
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

// axios for AJAX call
import axios from 'axios';

// navigate router 
import { useNavigate } from 'react-router-dom';

import { api_route } from '../../../Api-config/config';

// styled div
const Responsive = styled("div")(({theme}) => ({
    [theme.breakpoints.down('lg')] : {
        display : 'none'
    },
    marginTop : '4rem'
   
}))



function Login(){
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const paperStyle = {
      height: '30rem',
      width: 380,
      margin : '8rem auto',
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
  const [showPassword, setShowPassword] = useState(false);

  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues : {
      email : '',
      password : '',
      remember : true
    },
    validationSchema : LoginSchema,
    onSubmit : async (values, {setErrors, setSubmitting, resetForm}) => {
      
    try{
      setLoading(true);

      const response = await axios.post(`${api_route}/superAdmin/login`);
      setLoading(false);

      const data = response.data;

      if(data.success){
        // set token to localstorage
          console.log(data);
          navigate('/admin/dashboard');
          resetForm();
        //
      }else{
        setErrors({afterSubmit : data.error});
      }

 
       
    }
    catch(error){
      resetForm()
      setLoading(false);
      setErrors({afterSubmit : error.message});
    }
      
    
    }
  });
  

  
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  




return (

  <Grid container style = {rootStyle}>
        {loading && <Box sx = {{width : '100%'}}><LinearProgress /></Box>}

      <Responsive lg = {5} xl = {5}  >
          <img src = {loginImg} style = {{height : 600, width :550}}></img>
      </Responsive>
      <Grid item xs = {12} sm = {12} md = {12} lg = {6} xl = {7}  > 

          <Paper elevation = {10} style = {paperStyle}>
              <Grid align = 'center'>
                  <Avatar style = {avatarStyle}><LockIcon /></Avatar>
                  <h3>Log In</h3>
              </Grid>

              <FormikProvider value = {formik}>
                <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                  <TextField 
                    style={inputStyle} 
                    fullWidth 
                    autoComplete="username"
                    label="Email address" 
                    variant="outlined" 
                    required 
                    type = 'email'
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    style = {inputStyle}
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                    <FormControlLabel
                      {...getFieldProps('remember')}
                      checked = {values.remember}
                      control = {
                        <Checkbox {...getFieldProps('remember')} checked = {values.remember}/>
                      }
                      label = 'Remember me'
                    />
                   
                   
                  <Button 
                    type = 'submit'
                    variant='contained' 
                    disabled = {errors.email || errors.password || loading}
                    fullWidth
                    style = {btnStyle}   
                  > LOG IN
                  </Button>
                   
                </Form>
              </FormikProvider>
             
          </Paper>
      </Grid>

  </Grid> 

  
)
}

export default Login;

