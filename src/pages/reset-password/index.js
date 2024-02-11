// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import bcrypt from 'bcryptjs'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const ResetPassword = () => {
  // ** State
  const [email,setEmail] = useState()


  //Main ..//
  const handleSubmit = async(e) => {
    e.preventDefault()


  }

  // ** Hook and functions to show and hide password.//
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='p' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              {/* Welcome to {themeConfig.templateName}! */}
              ENTER YOUR EMAIL FOR RECOVERY LINK!
            </Typography>
            {/* <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography> */}
          </Box>
          <form noValidate autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
            <TextField autoFocus fullWidth onChange={(e)=>setEmail(e.target.value)} 
            id='email' label='Email' sx={{ marginBottom: 4 }} />
            <Button
              fullWidth
              type='submit'
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              SEND
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
ResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
