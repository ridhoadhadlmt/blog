import React from 'react'
import {
    Button, 
    IconButton,  
    Dialog, 
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import TrashAltIcon from '../assets/icon/trash-alt'


const SimpleDialog = (props) => {
    const {open, setOpen, handleDelete, data} = props
    function handleClose() {
        setOpen(false);
    }
    
  return (
    <Dialog onClose={handleClose} open={open} >
        <DialogTitle
        sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TrashAltIcon color='#F33A3A'/> Delete Article
        </DialogTitle>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 15, right: 15}}>
            <CloseIcon />
        </IconButton>
        <DialogContent>
            <DialogContentText>
            Are you sure you want to delete data {data || ''} ? You can’t undo this action.
            </DialogContentText>
            <DialogActions>
                <Button 
                    sx={{
                        color: '#9E9D9D',
                    }}
                    onClick={handleClose}>Cancel</Button>
                <Button 
                    sx={{
                        backgroundColor:'#F33A3A',
                        '&:hover' : {
                            backgroundColor:'#B22B2B',
                            
                        }
                    }}
                    onClick={handleDelete} 
                    variant='contained'
                    
                    autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>

  )
}

export default SimpleDialog