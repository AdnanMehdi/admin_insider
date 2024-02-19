import CardImgTop from 'src/views/cards/CardImgTop'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import router from 'next/router'
import React, { useState } from "react";
import Modal from "react-overlays/Modal";
import baseUrl from '../../../helpers/baseUrl'

export default function Blogs({blog}){
    

    return(
        <Grid container spacing={6}>
            <Grid container paddingLeft={"20px"}>
                <h1>Blogs</h1>
                <Grid item xs={8} style={{position:"absolute",right:"0",padding:"20px"}}>
                    <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={()=>router.push('blogs/add-blogs')}> 
                    Add Blogs
                    </Button>
                </Grid>
            </Grid>
            <div style={{display:"flex",flexWrap:"wrap",gap:"10px",padding:"20px"}}>
                <CardImgTop blogs={blog}/>
            </div>            
        </Grid>
        
    )
}

export async function getStaticProps(){
    const res = await fetch(`${baseUrl}/api/blog`)
    const data = await res.json()

    return{
        props:{
            blog:data
        }
    }
}