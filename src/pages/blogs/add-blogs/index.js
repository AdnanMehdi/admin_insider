import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'


export default function AddBlogs(){

    const [title,setTitle] = useState("")
    const [tags,setTags] = useState("")
    const [banner,setBanner] = useState()
    const [content,setContent] = useState("")
    let imageUrl = {}

    const handleSubmit= async (e)=> {
        e.preventDefault()

        console.log(banner)
        await UploadBanner()
        
        const res = await fetch(`http://localhost:3000/api/blog`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                tags,
                banner:imageUrl,
                content
            })
        })
        const res2 = await res.json()
        if(res2.error){
            console.log("Error Server")
        }
        else{
            console.log("Success")

            setTitle("")
            setTags("")
            setBanner("")
            setContent("")
        }

        
    }

    const UploadBanner = async() =>{
        // const FilesArray = Array.from(banner)
        const data = new FormData()
        data.append('file',banner[0])
        data.append('upload_preset',"deeninsider")
        data.append('cloud_name',"dtz17x0mi")

        const res = await fetch("https://api.cloudinary.com/v1_1/dtz17x0mi/image/upload",{
            method:"POST",
            body:data
        })
        const res2 = await res.json()
        imageUrl = res2.url
        console.log(res2.url)
    }

    return(
        <Card>
            <CardContent>
                <Grid>
                    <h2>New Blog</h2>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <Grid container spacing={7}>        
                        <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label='Tags' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <label style={{fontWeight:"bold"}}> Banner Image : </label>
                            <input type='file' accept='image/*' onChange={(e)=>{setBanner(e.target.files)}}/>
                        {/* <TextField required fullWidth type='url' label='Banner Image Url' 
                        value={banner} onChange={(e)=>{setBanner(e.target.value)}}/> */}
                        </Grid>
                        <Grid item xs={12}>
                        <TextField required fullWidth multiline rows={12} type='message' label='Content'
                        value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                        </Grid>
                    
                        
            
                        <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                            submit
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary'>
                            Cancel
                        </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Grid>
            </CardContent>
        </Card>
    )
}