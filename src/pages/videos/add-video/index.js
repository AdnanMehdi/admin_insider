import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AddVideo(){

    const [title,setTitle] = useState("")
    const [link,setLink] = useState("")
    const [tags,setTags] = useState("")
    const [checked,setChecked] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()

        

        const res = await fetch(`http://localhost:3000/api/video`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                link,
                tags,
                priority:checked,
                type:"Videos"
            })
        })
        const res2 = await res.json()
        if(res2.error){
            toast.error('Something went wrong!', {
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
        else{
            toast.success('Video Uploaded!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setTitle(""),
            setLink("")
            setTags("")
        }

    }

    return(
        <Card>
            <ToastContainer/>
            <CardContent>
                <Grid>
                    <h2>Add Video</h2>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <Grid container spacing={7}>        
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Name/Title' required value={title} 
                        onChange={(e)=>setTitle(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Tags' required value={tags} 
                        onChange={(e)=>setTags(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField fullWidth type='link' label='Link' placeholder='https://youtube....' required value={link} 
                        onChange={(e)=>setLink(e.target.value)}/>
                        </Grid>       
                        <Grid item xs={12} sm={4}>
                        <FormGroup>
                        <FormControlLabel control={<Switch checked={checked} onChange={()=>setChecked(event.target.checked)} 
                        color="primary"/>} label="Priority" labelPlacement="top" />
                        </FormGroup>
                        </Grid>       
                        <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                            submit
                        </Button>
                        {/* <Button type='reset' variant='outlined' color='secondary'>
                            Reset
                        </Button> */}
                        </Grid>
                    </Grid>
                    </form>
                </Grid>
            </CardContent>
        </Card>
    )
}