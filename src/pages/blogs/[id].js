import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ReactPlayer from 'react-player'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import router from 'next/router'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import {parseCookies} from 'nookies'

export default function BlogId({blogId}){
    // react state to control modal visibility.
    const [showModel,setShowModel] = useState(false)
    const [title,setTitle] = useState()
    const [content,setContent] = useState()
    const [tags,setTags] = useState()
    const [status,setStatus] = useState()

    // geting cookies info with nookies
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) :""

    // console.log(user)

    //Update Function//
    const handleSubmit = async(e)=>{
        e.preventDefault()

        const res = await fetch(`http://localhost:3000/api/blogs/${blogId._id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // pid:videoId._id,
                title,
                content,
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
            router.push(`/admin/blogs/${blogId._id}`)
        }
    }

    //delete funciton api call
    const deleteVideo = async() =>{
        const res = await fetch(`http://localhost:3000/api/blogs/${blogId._id}`,{
            method:"DELETE"
        })
        await res.json()
        router.push('/admin/blogs')
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
                    <img src={blogId.banner} height={"400px"} alt='not Found'/>
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
                        {user.role == "member" ? ""
                        :
                        <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select label='Status' defaultValue={blogId.status} 
                                        onChange={(e)=>setStatus(e.target.value)}>
                                    <MenuItem value='pending'>Pending</MenuItem>
                                    <MenuItem value='approved'>Approved</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                        
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Title' defaultValue={blogId.title}
                            onChange={(e)=>setTitle(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Tags' defaultValue={blogId.tags} 
                            onChange={(e)=>setTags(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <TextField fullWidth multiline rows={12} type='message' label='Content'
                            defaultValue={blogId.content}
                            onChange={(e)=>setContent(e.target.value)}/>
                        </Grid>     
                        <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                            Update
                        </Button>
                        <Button type='reset' variant='contained' color='error' onClick={()=>{setShowModel(true)}} >
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

    const res = await fetch(`http://localhost:3000/api/blogs/${id}`)
    const data = await res.json()

    return{
        props:{
            blogId:data
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
        justifyContent:"center",
        flexDirection:"column",
        boxShadow:"3px 3px 9px black",
        padding:"20px",
        borderRadius:"6px",
        position:"absolute",
        margin:"0 auto",
        top:"30%",
        left:"35%"  
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