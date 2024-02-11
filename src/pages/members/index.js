// ** React Imports
import { useState } from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import TableBasic from 'src/views/tables/TableBasic'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { parseCookies } from 'nookies'
import router from 'next/router'



export default function Questions({members}) {
    // ** State
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confrimPass, setConfrimPass] = useState()
    const [role, setRole] = useState()

    // console.log(members)
    
    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(password == confrimPass){
            const res = await fetch(`http://localhost:3000/api/admin`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })
            })
            const res2 = await res.json()
            if(res2.error){
                toast.error('Account already exist', {
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
                toast.success(' Member Added!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                router.push('/members')
            }
        }
        else{
            toast.error('Password does not match', {
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
        <Card>
            <CardContent>
            <ToastContainer/>
                <h1>Add New Members</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                <Grid container spacing={7}>        
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' label='Email' value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='password' label='Password'
                        value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='password' label='Confrim Password'
                        value={confrimPass} onChange={(e)=>{setConfrimPass(e.target.value)}} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel >Role</InputLabel>
                            <Select label='Role' value={role} onChange={(e)=>setRole(e.target.value)}>
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='member'>Member</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
        
                    <Grid item xs={12}>
                    <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
                        Add
                    </Button>
                    </Grid>
                </Grid>
                </form>

                <Grid item xs={12} paddingTop={"90px"}>
                    {/* <Card> */}
                        <CardHeader title='Members Info' titleTypographyProps={{ variant: 'h6' }} />
                        <TableBasic member={members} />
                    {/* </Card> */}
                </Grid>
            </CardContent>
        </Card>
    )
}

export async function getStaticProps(){
    const res = await fetch('http://localhost:3000/api/admin')
    const data = await res.json()

    return{
        props:{
            members:data
        }
    }
}