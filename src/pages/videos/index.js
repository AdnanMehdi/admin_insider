import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import router from 'next/router'
import Link from 'next/link'


export default function Videos({video}){
    // react state to control modal visibility.
    const [showModel,setShowModel] = useState(false)

    // const [id, setId] = useState()

    // console.log(video)

    return(
        <Card>
            
            <CardContent>
                <Grid container spacing={6}>
                    <Grid container padding={"20px"}>
                        <h1>Videos</h1>
                        <Grid item xs={8} style={{position:"absolute",right:"0",padding:"20px"}}>
                            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={()=>router.push('videos/add-video')}>
                            Add Videos
                            </Button>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <FormControl >
                            <InputLabel>Category</InputLabel>
                            <Select label='category' defaultValue='islam' onChange={handleClick}>
                            <MenuItem value='islam'>Islam</MenuItem>
                            <MenuItem value='shia'>Shia</MenuItem>
                            <MenuItem value='sunni'>Sunni</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <div style={{width:"100%",cursor:"pointer"}}>
                        <div style={{display:"flex",flexWrap:"wrap",overflow:"auto",justifyContent:"center"
                            ,alignItems:"center",gap:"5px",padding:"20px"}}>
                            {video.map((item)=>(
                                <div key={item.id} style={myStyles.videoCard}>
                                    {item.status == "pending" ?(<div style={myStyles.status}>{item.status}</div>):
                                    (<div style={myStyles.status1}>{item.status}</div>)}
                                    <div style={myStyles.play}><img src='/images/play-button.png' width={"50px"} alt='not found' /></div>
                                    <Link href={'videos/[id]'} as={`videos/${item._id}`}>
                                        <a style={{textDecoration:"none",textAlign:"center",color:"black"}}>
                                        {/* <ReactPlayer url={item.link} controls width={"300px"} height={"200px"}/> */}
                                        <img src={`https://img.youtube.com/vi/${item.link.slice(32)}/hqdefault.jpg`} 
                                            width={"300px"} height={"200px"} alt='not FOund' />
                                        
                                        <div>
                                            <h3>{item.title}</h3>
                                        </div>
                                        </a>
                                    </Link>
                                </div>
                                
                            ))}
                        </div>
                    </div>

                </Grid>
            </CardContent> 
        </Card>
    )
}


export async function getStaticProps(){
    const res = await fetch(`http://localhost:3000/api/video`)
    const data = await res.json()

    return {
        props:{
            video:data
        }
    }
}

const myStyles={
    videoCard:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:"10px",
        
        // border:"2px solid red",
        // boxShadow:"2px 2px 4px purple",
        boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
        top:"30%",
        left:"35%"
    },
    status:{
        position:"absolute",
        background:"#8B0000",
        borderRadius:"5px",
        padding:"5px",
        color:"white"
      },
      status1:{
        position:"absolute",
        background:"green",
        borderRadius:"5px",
        padding:"5px",
        color:"white"
      },
      play:{
        position:"absolute",
        top:"50%",
      }
}