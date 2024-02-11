// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'

const CardImgTop = ({blogs}) => {
  // console.log(blogs)

  return (
    blogs?.map((item)=>{
        return(
          <Card key={item._id} style={{width:"300px"}} >
            {item.status == "pending" ?(<div style={myStyles.status}>{item.status}</div>):
            (<div style={myStyles.status1}>{item.status}</div>)}
          <Link href={'/blogs/[id]'} as={`/blogs/${item._id}`}>
            <a>
            <CardMedia sx={{ height: '14.5625rem' }} image={item.banner} />
            </a>
            </Link>
            {/* <PlayButton style={{position:"absolute",zIndex:"2",color:"black",width:"30px",height:"30px"}}/> */}
            <CardContent>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                {item.title}
              </Typography>
              <Typography variant='body2'>
                {item.content.slice(0,120)}{"..."}
              </Typography>
            </CardContent>
            
          
          </Card>
        )
    })
  )
}

export default CardImgTop

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
  }
}