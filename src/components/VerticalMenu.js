import React from 'react'
import { styled } from '@mui/material/styles'
import {Box, 
    Typography, 
    List,
    ListItem, 
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Divider,
    IconButton,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import Logo from '../assets/img/logo.png' 
// import ArticleIcon from '../assets/icon/article.svg' 
// import PieChartIcon from '../assets/icon/pie-chart.svg'
import MenuIcon from '../assets/icon/menu.svg'
import { NavLink } from 'react-router-dom'
import  ArticleIcon  from '../assets/icon/article'
import  DashboardIcon  from '../assets/icon/dashboard'

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
  
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function VerticalMenu({setOpen, open}) {
  
  const menus = [
    {label: 'Dashboard', to: '/', index: 0},
    {label: 'Article', to: '/article', index: 1},

  ]
  const handleDrawerClose = () => {
    setOpen(false);
  }
  
  return (
    <div>
        <Box sx={{ backgroundColor: '#FFF'}}>
            
            <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{justifyContent: 'space-between', px: 2,}}>
              <IconButton onClick={handleDrawerClose}>
                <img src={MenuIcon} alt='menu'></img>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box sx={{ display: open ? 'flex' : 'none', p: 2, alignItems: 'center', justifyContent: 'center'}}>
              <img src={Logo} alt='logo'></img>
              <Typography variant='h6' sx={{ color:'#51B15C', pl: 2}}>Logo</Typography>
            </Box>
            <List sx={{ px: 1}}>

              {menus.map((menu, index) =>  (
              
                <ListItem key={index} disablePadding sx={{ display: 'block', color: '#51B15C', textDecoration: 'none' }}>
                    <NavLink 
                      underline='none' 
                      sx={{}} 
                      to={menu.to} 
                      
                      >
                      
                      <ListItemButton
                        id="nav-link"
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {menu.label  === 'Dashboard' ?  <DashboardIcon/>: <ArticleIcon /> }
                        </ListItemIcon>
                        <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0, color: '#51B15C' }} />
                      </ListItemButton>
                    </NavLink>
                </ListItem>
              ))}
            </List>
          </Drawer>
            
        </Box>
    </div>
  )
}

export default VerticalMenu