import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Trash from 'mdi-material-ui/FileExcelBox'
import router from 'next/router';
import Link from 'next/link'


export default function Gallery({photos}){


  return(
    <Card>
    {/* <h1>Videos</h1> */}
    <CardContent>
        <Grid container spacing={6}>
            <Grid container padding={"20px"}>
                <h1>Gallery</h1>
                <Grid item xs={12} style={{position:"absolute",right:"0",padding:"20px"}}>
                    <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={()=>router.push('gallery/add-photo')}>
                    Add Photo
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <ImageList cols={3}>
                {photos.map((item) => (
                  <Link href={'/gallery/[id]'} as={`/gallery/${item._id}`} >
                    <a>
                    <ImageListItem key={item.id} style={{cursor:"pointer"}}>
                    {item.status == "pending" ?(<div style={myStyles.status}>{item.status}</div>):
                  (<div style={myStyles.status1}>{item.status}</div>)}
                    <img
                        srcSet={`${item.mediaUrl}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.mediaUrl}?w=200&h=200&fit=crop&auto=format`}
                        alt="not Found"
                        loading="lazy"
                    />
                    
                    
                        {/* <Trash style={{position:"absolute",right:"1",color:"red",
                          width:"30px",height:"30px",borderRadius:"50%"}}/> */}
                    </ImageListItem>
                    </a>
                    </Link>
                ))}
              </ImageList>
            </Grid>
            
        </Grid>
    </CardContent> 
  </Card>      
  )
}

export async function getStaticProps(){
  const res = await fetch(`http://localhost:3000/api/photo`)
  const data = await res.json()

  return{
    props:{
      photos:data
    }
  }
}

const myStyles={
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
}