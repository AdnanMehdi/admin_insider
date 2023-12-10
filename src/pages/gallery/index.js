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
  // console.log(photos)

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
              <ImageList cols={4} >
                {photos.map((item) => (
                  <Link href={'/gallery/[id]'} as={`/gallery/${item._id}`} >
                    <a>
                    <ImageListItem key={item.id} style={{cursor:"pointer"}}>
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

      // <div>
      //     <div style={{display:"flex",alignItems:"center"}}>
      //         <h1>Gallery</h1>
      //         <div style={{display:"flex",right:"1"}}>
      //             <button>
      //                 Create
      //             </button>
      //         </div>
      //     </div>
      //     <ImageList  cols={3} >
      //         {itemData.map((item) => (
      //             <ImageListItem key={item.img}>
      //             <img
      //                 srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      //                 src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
      //                 alt={item.title}
      //                 loading="lazy"
      //             />
      //                 <Trash style={{position:"absolute",right:"1",color:"white",width:"30px",height:"30px"}}/>
      //             </ImageListItem>
      //         ))}
      //     </ImageList>
      // </div>
      
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