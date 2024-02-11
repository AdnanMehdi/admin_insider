// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Trash from 'mdi-material-ui/Delete'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TableContainer from '@mui/material/TableContainer'
import router from 'next/router'
import { useState } from 'react'

// const createData = (name, email, role, dlt) => {
//   return { name, email, role, dlt} 
// }

const TableBasic = ({member}) => {

  const [showModel,setShowModel] = useState(false)
  const [userID, setUserId] = useState('')

  //delete Function
  const deleteAdmin = async(id) =>{
    // console.log(id)
    const res = await fetch(`http://localhost:3000/api/admins/${id}`,{
        method:"DELETE"
    })
    await res.json()
    router.push('/members')
}
  
  return (
    <TableContainer component={Paper}>
      {showModel ? (
                <div style={myStyles.Popup}>
                    <img src='/images/logos/sure.png' width={"100px"} height="100px" alt='not found' />
                    <h2>Are You Sure??</h2>
                    <div style={{display:"flex",gap:"25px"}}>
                        <button style={myStyles.buttonStyle} onClick={()=>{deleteAdmin(userID),setShowModel(false)}} >Yes</button>
                        <button style={myStyles.buttonStyle} onClick={()=>{setShowModel(false)}} >No</button>
                    </div>
                </div>
            ):null}
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Role</TableCell>
            <TableCell align='right'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {member.map(item => (
            <TableRow
              key={item.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell align='right'>{item.email}</TableCell>
              <TableCell align='right'>
                {item.role}
                {/* <Grid item xs={12} sm={6}>
                    <FormControl >
                        <InputLabel>Role</InputLabel>
                        <Select label='Role' defaultValue={item.role}>
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='member'>Member</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid> */}
              </TableCell>
              <TableCell align='right'  >
                {item.role == "root" ? "": <Trash style={{cursor:"pointer"}} 
                onClick={()=>{setShowModel(true),setUserId(item._id)}}/>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic

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