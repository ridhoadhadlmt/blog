import React from 'react'
import { Grid, TextField } from '@mui/material'

function TextFieldComponent() {
  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                    <TextField id="outlined-basic" label="outlined" fullWidth variant="outlined"/>
            </Grid>
            {/* <Grid item xs={4}>
                    <TextField id="filled-basic" label="filled" fullWidth variant="filled"/>
                
            </Grid>
            <Grid item xs={4}>
                    <TextField id="standard-basic" label="standard" fullWidth variant="standard"/>
                
            </Grid> */}
        </Grid>
    </div>
  )
}

export default TextFieldComponent