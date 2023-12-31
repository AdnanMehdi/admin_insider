import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ReactPlayer from 'react-player'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import router from 'next/router'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {parseCookies} from 'nookies'



export default function VideoId({videoId}){
    // react state to control modal visibility.
    const [showModel,setShowModel] = useState(false)
    const [title,setTitle] = useState()
    const [link,setLink] = useState()
    const [tags,setTags] = useState()
    const [status,setStatus] = useState()

    // cookies with nookies for role//
    const cookie = parseCookies()
    const mycookie = JSON.stringify(cookie)
    const role = mycookie ? JSON.parse(mycookie) :""

    //Update Function//
    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const res = await fetch(`http://localhost:3000/api/videos/${videoId._id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // pid:videoId._id,
                title,
                link,
                tags,
                status
            })
        })
        const res2 = await res.json()
        if(res2.error){
            console.log("Error")
        }
        else{
            console.log("Success")
            router.push(`/admin/videos/${videoId._id}`)
        }
    }

    //delete Function
    const deleteVideo = async() =>{
        const res = await fetch(`http://localhost:3000/api/videos/${videoId._id}`,{
            method:"DELETE"
        })
        await res.json()
        router.push('/admin/videos')
    }

    return(
        <Card>
            {showModel ? (
                <div style={myStyles.Popup}>
                    <img src='/images/logos/sure.png' width={"100px"} height="100px" alt='not found' />
                    <h2>Are You Sure??</h2>
                    <div style={{display:"flex",gap:"25px"}}>
                        <button style={myStyles.buttonStyle} onClick={()=>{deleteVideo(),setShowModel(false)}} >Yes</button>
                        <button style={myStyles.buttonStyle} onClick={()=>{setShowModel(false)}} >No</button>
                    </div>
                </div>
            ):null}
            <CardContent>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                    <ReactPlayer url={videoId.link} controls/>
                </div>
                <form style={{padding:"20px"}} onSubmit={(e)=>handleSubmit(e)}>
                    <Grid container spacing={7}>
                        {/* <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" />}
                                label="Update"
                                labelPlacement="start"
                                
                                // checked={checked}
                                // onChange={handleChange}
                                />
                        </Grid> */}
                        {role.user == "member" ? "" :
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select label='Status' defaultValue={videoId.status} 
                                    onChange={(e)=>setStatus(e.target.value)}>
                                <MenuItem value='pending'>Pending</MenuItem>
                                <MenuItem value='approved'>Approved</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>}      
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Title' defaultValue={videoId.title} 
                            onChange={(e)=>setTitle(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Tags' defaultValue={videoId.tags}
                            onChange={(e)=>setTags(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField fullWidth type='link' label='Link' placeholder='https://youtube....'
                            defaultValue={videoId.link}
                            onChange={(e)=>setLink(e.target.value)}/>
                        </Grid>       
                        <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                            Update
                        </Button>
                        <Button type='delete' variant='outlined' color='error' onClick={()=>{setShowModel(true)}} >
                            Delete
                        </Button>
                        </Grid>
                    </Grid>
                    </form>

            </CardContent>
        </Card>
    )


}

export async function getServerSideProps({params:{id}}){

    const res = await fetch(`http://localhost:3000/api/videos/${id}`)
    const data = await res.json()

    return{
        props:{
            videoId:data
        }
    }
}

const myStyles={
    videoCard:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:"10px",
        border:"2px solid red",
        borderRadius:"10px",
    },
    Popup:{
        width:"400px",
        background:"white",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        boxShadow:"3px 3px 9px black",
        padding:"20px",
        borderRadius:"6px",
        position:"absolute",
        top:"50%",
        left:"50%",
        transfrom:"translate(-50%, -50%)"
    },
    buttonStyle:{
        padding:"15px 30px",
        fontWeight:"bold",
        backgroundColor:"#3DCFF5",
        borderRadius:"20px",
        border:"none",
        color:"white",
        cursor:"pointer",
        fontSize:"20sp"
    },
}