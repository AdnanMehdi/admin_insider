import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { writeFile } from "fs/promises";
import {join} from 'path'


export default function AddPhoto(){

    const [media, setMedia] = useState()
    const [selectFiles, setSelectFile] = useState([])
    const ImagePush = []

    const handleClick = async(e) =>{
        e.preventDefault()

        await MultipleUpload()

        // storing url images in mongodb.
        for(var i=0; i<ImagePush.length; i++){
            const res = await fetch(`http://localhost:3000/api/photo`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    mediaUrl:ImagePush[i]
                })            
            })
            const res2 = await res.json()
            if(res2.error){
                console.log("eror")
            }else{
                console.log("Good")
                setSelectFile("")
            }
        }       

    }

// setting images in arrays to show on frontend 
    const SelectedImage = async (e) =>{
        const Files = e.target.files;
        const FilesArray = Array.from(Files)

        setMedia(e.target.files)

        const imageArray = FilesArray.map((file)=>{
            return URL.createObjectURL(file)
        })
        setSelectFile(imageArray)        
    }

     // uploading photos in local directory
    //  const fileUpload = async () =>{
    //     for(var i=0; i < media.length; i++){
    //         // const data = new FormData()
    //         // data.set('file',[media[i]])
    //         const byte = await media[i].arrayBuffer()
    //         const bufferImage = Buffer.from(byte)
    //         const path = join(__dirname,'public','upload',media[i].name)

    //         // `./public/upload/gallery/${media[i].name.replaceAll(" ","-")}`

    //         writeFile(path,bufferImage)
    //         console.log("success",bufferImage)
            
    //     }
    //  }

    // uploading file in database server..
    const MultipleUpload = async () =>{
        for(var i=0; i< media.length; i++){
            // ImagePush.push(media[i])
            const data = new FormData()
            data.append('file',media[i])
            data.append('upload_preset',"deeninsider")
            data.append('cloud_name',"dtz17x0mi")
            data.append('secure','true')

            const res = await fetch("https://api.cloudinary.com/v1_1/dtz17x0mi/image/upload",{
                method:"POST",
                body:data
            })
            const res2 = await res.json()
            ImagePush.push(res2.url)    
        }
        console.log("success")
    }

    return(
        <Card>
            <CardContent>
                <Grid>
                    <h2>Add Photo</h2>
                </Grid>
                <Grid style={{display:"flex",justifyContent:"center"}}>
                    <label>
                    <div style={myStyles.uploadButton}>
                        <h3>+ Add Images</h3>
                        <span>Multiple Uploads....</span>
                        <input style={{display:"none"}} type="file" multiple accept="image/*"
                            onChange={SelectedImage}/>
                    </div>
                    </label>
                </Grid>
                <Grid style={{display:"flex",flexWrap:"wrap"}}>
                    {selectFiles && selectFiles.map((image)=>{
                        return(
                            <div key={image}>
                                <img src={image} alt="not found" style={myStyles.Images} />
                            </div>
                        )
                    }) }
                </Grid>
                <Grid style={{paddingTop:"40px"}}>
                    <Button onClick={(e)=>handleClick(e)} variant='contained' sx={{ marginRight: 3.5 }}>
                        Upload
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    )
}

const myStyles={
    uploadButton:{
        // width:"35%",
        display:"flex",
        padding:"20px",
        marginBottom:"10px",
        flexDirection:"column",
        alignItems:"center",
        border:"2px solid gray",
        borderRadius:"10px",
        cursor:"pointer"
    },
    Images:{
        padding:"3px",
        width:"170px",
        height:"170px",
        borderRadius:"15px",
        objectFit:"center"

      }
    
}