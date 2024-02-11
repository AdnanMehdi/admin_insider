// ** React Imports
import { useState } from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))



const TabAccount = ({info}) => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [email,setEmail] = useState()
  const [password,setPass] = useState()

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    const res = await fetch(`http://localhost:3000/api/admins/${info?.userId}`,{
      method:"PUT",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          email,
          password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      toast.error('Wrong Password!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    }else{
      toast.success('Email Updated!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
    });
      
    }
    

  }

  return (
    <CardContent>
      <ToastContainer/>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' defaultValue={`${info?.name}`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              defaultValue={`${info?.email}`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Role' defaultValue={`${info?.role}`} />
          </Grid>
          <Grid item xs={12}>
            <h2>Change Your Email:</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              defaultValue={`${info?.email}`}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </Grid>
          <Grid item xs={12} sm={6.01}>
            <TextField fullWidth label='Password' type='password' onChange={(e)=>{setPass(e.target.value)}}/>
          </Grid>
          

          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Submit
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
