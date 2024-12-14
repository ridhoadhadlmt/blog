import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, 
  Toolbar, 
  IconButton, 
  Typography,
  Popper, 
  Badge,
  } from '@mui/material'

import MuiAppBar from '@mui/material/AppBar'
import Routes from '../routes' 
import UkFlag from '../assets/img/uk-flag.svg'
import AvatarProfile from '../assets/img/profile.svg'
import MenuIcon from '../assets/icon/menu.svg' 
import NotificationIcon from '../assets/icon/notification' 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


function MainContent({open,setOpen}) {

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const popUpLanguange = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);
  const id = open ? 'languange-popper' : undefined;
  return (
    <div>
        <Box sx={{ ml: open ? '16%' : '66px' , backgroundColor: '#EDEDED', height: '100vh', zIndex: 0, pt: 8,}}>
          <AppBar sx={{backgroundColor: '#FFF', boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.12) '}} position="fixed" open={open}>
            <Toolbar sx={{zIndex: 0, justifyContent: 'space-between'}}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <img src={MenuIcon} alt='menu'></img>
              </IconButton>
                <Typography sx={{ display: open ? 'block' : 'none'}} variant="h6" color="black" noWrap component="div">
                  Admin
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Box sx={{ color: '#51B15C' }}>
                    <img src={UkFlag} alt='flag' >
                    
                    </img>
                    <ExpandMoreIcon sx={{ color:'black'}} type="button" onClick={popUpLanguange} />
                    <Popper id={id} sx={{ zIndex: 10000,width: '180px',border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 6, overflow: 'hidden'}} placement='bottom-end' open={openPopper} anchorEl={anchorEl}>
                      <Box borderRadius={4} sx={{ p: 2, bgcolor: 'background.paper',  }}>
                        <Box sx={{ display: 'flex'}}>
                          <img src={UkFlag} alt='flag'>
                      
                          </img>
                          <Typography variant='h6' pl={2}>Indonesia</Typography>
                        </Box>
                        <Box sx={{ display: 'flex'}}>
                          <img src={UkFlag} alt='flag'>
                      
                          </img>
                          <Typography variant='h6' pl={2}>Inggris</Typography>
                          
                        </Box>
                      </Box>
                    </Popper>
                  </Box>
                  <Box sx={{ px: 4}}>
                    <Badge badgeContent={10} color="error">
                      <NotificationIcon/>
                    </Badge>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 4 , borderLeft: '1px solid #c4c4c4'}}>
                    <img src={AvatarProfile} alt='avatar'>
                    
                    </img>
                    <ExpandMoreIcon sx={{ color:'black'}} type="button" />
                    
                  </Box>
                </Box>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <Routes />
          </Box>
        </Box>
    </div>
  )
}

export default MainContent