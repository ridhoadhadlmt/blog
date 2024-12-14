import React from 'react'
import {  
    Select, 
    InputLabel, 
    FormControl,
    Grid,
    MenuItem,
} from '@mui/material'

const SelectItem = () => {
    const [age, setAge] = React.useState('')

    const handleChange = (event) => {
        console.log(event)
        setAge(event.target.value)
    }
  return (
    <div>
        <Grid container mt={4}>
                <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="age">Age</InputLabel>
                            <Select labelId="age" value={age} label="Age" id="age" onChange={handleChange}>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                        </FormControl>

                </Grid>
            </Grid>
    </div>
  )
}

export default SelectItem