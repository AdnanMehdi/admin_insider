import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ReactPlayer from 'react-player'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import router from 'next/router'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import {parseCookies} from 'nookies'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PhotoId({photoId}){
    // react state to control modal visibility.
    const [showModel,setShowModel] = useState(false)
    const [link,setLink] = useState()
    const [status,setStatus] = useState()
    const [checked,setChecked] = useState("")

    // geting cookies info with nookies
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) :""

    // console.log(imageName)

    //Update Function//
    const handleSubmit = async(e)=>{
        e.preventDefault()

        const res = await fetch(`http://localhost:3000/api/photos/${photoId._id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                link,
                status,
                priority:checked
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
            toast.success('Video Updated!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            router.push(`/gallery/${photoId._id}`)
        }
    }

    //delete funciton api call
    const deletePhoto = async() =>{
        const res = await fetch(`http://localhost:3000/api/photos/${photoId._id}`,{
            method:"DELETE"
        })
        await res.json()

        //delete image function//
        // deleteImage()
        router.push('/gallery')
    }

    const deleteImage = async()=>{
        // getting the name of image from database//
        const urlArray = photoId.mediaUrl.split('/')
        const image = urlArray[urlArray.length-1]
        const imageName = image.split('.')[0]

        // Deleting images from cloudinary..//
        const data = new FormData()
        data.append('file',imageName)
        data.append('upload_preset',"deeninsider")
        data.append('cloud_name',"dtz17x0mi")
        data.append('secure','true')

        const res = await fetch("https://api.cloudinary.com/v1_1/dtz17x0mi/image/upload",{
            method:"DELETE",
            body:data
        })
        await res.json()
    }


    return(
        <Card>
            <ToastContainer/>
            {showModel ? (
                <div style={myStyles.Popup}>
                    <img src='/images/logos/sure.png' width={"100px"} height="100px" alt='not found' />
                    <h2>Are You Sure??</h2>
                    <div style={{display:"flex",gap:"25px"}}>
                        <button style={myStyles.buttonStyle} onClick={()=>{deletePhoto(),setShowModel(false)}} >Yes</button>
                        <button style={myStyles.buttonStyle} onClick={()=>{setShowModel(false)}} >No</button>
                    </div>
                </div>
            ):null}
            <CardContent>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                    <img src={photoId.mediaUrl} height={"400px"} alt='not Found'/>
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
                                    <Select label='Status' defaultValue={photoId.status} 
                                        onChange={(e)=>setStatus(e.target.value)}>
                                    <MenuItem value='pending'>Pending</MenuItem>
                                    <MenuItem value='approved'>Approved</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                        {user.role == "member" ? "":
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                            <FormControlLabel control={<Switch  checked={checked} onChange={()=>setChecked(event.target.checked)} 
                            color="primary"/>} label="Priority" labelPlacement="top" />
                            </FormGroup>
                        </Grid> }
                        
                        <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='Link' defaultValue={photoId.mediaUrl}
                        onChange={(e)=>setLink(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
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

    const res = await fetch(`http://localhost:3000/api/photos/${id}`)
    const data = await res.json()

    return{
        props:{
            photoId:data
        }
    }

}

const myStyles={
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