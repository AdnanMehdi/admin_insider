import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

export default function Questions(){

    return(
        <Grid item xs={12}>
            <Card>
                <CardHeader title='List of Questions' titleTypographyProps={{ variant: 'h6' }} />
                <TableStickyHeader />
            </Card>
      </Grid>
    )
}