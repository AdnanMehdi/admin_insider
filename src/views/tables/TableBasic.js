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

// const createData = (name, email, role, dlt) => {
//   return { name, email, role, dlt} 
// }

const TableBasic = ({member}) => {
  
  return (
    <TableContainer component={Paper}>
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
              <TableCell align='right'>
                <Trash style={{cursor:"pointer"}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
