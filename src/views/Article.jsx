import React, {useState, useEffect, useRef,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce';
import {  fetchArticle, 
  showArticle, 
  getData, 
  getDataDetail, 
  createDataArticle, 
  addData, 
  createData, 
  changeTab, 
  tabPanel, 
  destroyDataArticle,
  updateDataArticle,
  loadDataDetail,
  isLoading} from '../slices/article'

import { 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel,
  MenuItem, 
  Select, 
  Button, 
  IconButton,
  Grid,
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell,
  TableBody,
  Pagination,
  Stack
} from '@mui/material'
import { TabPanel, TabContext, TabList,} from '@mui/lab'
import ArticleListIcon from '../assets/icon/article-list'
import ArticleEditIcon from '../assets/icon/article-edit'
import SearchIcon from '../assets/icon/search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '../assets/icon/edit'
import TrashIcon from '../assets/icon/trash'
import ConfirmDialog from '../components/Dialog'

const Article = () => {
  const [valTab,setValue] = useState('1');
  const [valOpt, setValOpt] = useState('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [debounceSearchValue, setDebounceSearchValue] = useState('')


  const handleChangeTab = (valTab, newValue) => {
    setValue(newValue);
    dispatch(changeTab('add'))
  }
  const handleChangeSelect = (newValue) => {
    setValOpt(newValue)
  }
  const handlePage = (page) => {
    setPage(page)
  }
  const dispatch = useDispatch();
  const year = [{label: '2022'}, {label: '2023'}, {label: '2024'}]
  const tabs = [
    {index: 1, title: 'Article', subtitle: 'List Article', icon: <ArticleListIcon/>},
    {index: 2, title: 'Add/Edit', subtitle: 'Detail Article', icon: <ArticleEditIcon/>},
  ]
  const article = useSelector(addData)
  const articleEdit = useSelector(getDataDetail)
  const data = useSelector(getData)
  
  const tab = useSelector(tabPanel)
  const isLoadingData = useSelector(isLoading)

  const handleAdd = async () => {
    const params = {title: article.title, content: article.content}
    dispatch(createDataArticle(params))
    setValue('1')
  }
  const handleEdit = (id) => {
    dispatch(showArticle(id))
    setValue('2')
    dispatch(changeTab('edit'))
  }
  const handleFormAdd = () => {
    setValue('2')
    dispatch(changeTab('add'))
  }
  const handleConfirm = (id) => {
    setOpen(true)
    setId(id)
  }
  const handleUpdate = (id) => {
    const params = {title: articleEdit.title, content: articleEdit.content}
    dispatch(updateDataArticle(params, id))
    setValue('1')
  }
  const handleDestroy = () => {
    dispatch(destroyDataArticle(id))
    setOpen(false)
  }
  const handleCancel = () => {
    setValue('1')
  }
  const debouncedOnChange = useRef(
    debounce((value)=> {
      setDebounceSearchValue(value);
    }, 3000)
    ).current;

  useEffect(() => {
    const params = {
      search : debounceSearchValue
    }
    dispatch(fetchArticle(params))
    
  }, [isLoadingData,debounceSearchValue] )


  return (
    <div>
      <Box sx={{ background: '#FFF', width: '100%'}} borderRadius={4}>
        {/* {tabs.map((tab, index) => (
          
          <Tabs 
          value={valTab}
          onChange={handleChangeTab}
          key={index}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#D97D54"
            }
          }}
          >
            
          <Tab 
            label={
              <div>
                <Typography align='left' sx={{ textTransform: 'capitalize'}}>{ tab.title }</Typography> 
                <Typography sx={{ textTransform: 'capitalize'}}>{ tab.subtitle }</Typography> 
              </div>
            } iconPosition="start" icon={
              <Box sx={{
                
                  borderRadius: '50%', 
                  border: valTab ? '1px solid #51B15C' : 'none', 
                  width: 40, 
                  height: 40, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArticleListIcon/>
              </Box>
                }>
            
          </Tab>
         
        </Tabs>

        ))} */}
        <TabContext value={valTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label={<div>
                <Typography align='left' sx={{ textTransform: 'capitalize'}}>Article</Typography> 
                <Typography sx={{ textTransform: 'capitalize'}}>List Article</Typography> 
              </div>} iconPosition="start" icon={
              <Box sx={{
                
                  borderRadius: '50%', 
                  border: valTab ? '1px solid #51B15C' : 'none', 
                  width: 40, 
                  height: 40, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArticleListIcon/>
              </Box>
                } value="1"/>
              <Tab label={
                <div>
                  <Typography align='left' sx={{ textTransform: 'capitalize'}}>Add/Edit</Typography> 
                  <Typography sx={{ textTransform: 'capitalize'}}>Detail Article</Typography> 
                </div>
                } iconPosition="start" icon={
                <Box>
                  <ArticleEditIcon color='#939393'/>
                </Box>
              }value="2"/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid mb={4} container sx={{ justifyContent: 'space-between'}}>
                <Grid item md={7}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon color={'#CCC'} size={40}/>
                    <TextField 
                      fullWidth 
                      id="input-with-sx" sx={{ ml: 4}} 
                      label="Type to search" 
                      variant="standard" 
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        debouncedOnChange(e.target.value);
                      }} 
                      />
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Grid container spacing={2} sx={{
                    alignItems: 'center',
                  }}>
                    <Grid item md={7}>
                      <FormControl 
                        fullWidth
                        sx={{
                          p: 0,
                        }}>
                        <InputLabel id="year">Tahun</InputLabel>
                        <Select 
                          sx={{
                            p: 0,
                        }} 
                          p={0}
                          value={valOpt} 
                          labelId="year" 
                          label="Tahun" 
                          id="year" 
                          onChange={handleChangeSelect}>
                          {year?.map(item => {
                            return (
                              <MenuItem key={item.label} value={item.label}>
                                {item.label}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={5}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        sx={{ 
                          background: '#51B15C',
                          '&:hover' : {
                            background: '#3E8747'
                          }
                        }} 
                        startIcon={<AddIcon/>}
                        onClick={handleFormAdd}
                        >
                          Add
                      </Button>

                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
      
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item ,index) => (
                    <TableRow>
                      <TableCell>
                        {item.created_at}
                      </TableCell>
                      <TableCell>
                        {item.title}
                      </TableCell>
                      <TableCell>
                        {item.content}
                      </TableCell>
                      <TableCell>
                        <Box
                        sx={{
                          display: 'flex',
                          
                        }}>
                          <IconButton
                            sx={{
                            "&:hover": {
                              backgroundColor: '#A1690E',
                            },
                            minWidth: 40,
                            minHeight: 40,
                            borderRadius: '50%',
                            background: '#CF8812',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 1,
                          }} onClick={() => handleEdit(item?.id)}>
                              <EditIcon color='#FFF'  />
                          </IconButton>
                          <IconButton
                            sx={{
                            "&:hover": {
                              backgroundColor: '#B51414',
                            },
                            minWidth: 40,
                            minHeight: 40,
                            borderRadius: '50%',
                            background: '#FF1D1D',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 1,
                          }} onClick={() => handleConfirm(item?.id)}>
                              <TrashIcon color='#FFF'/>
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>
            <Stack sx={{ 
              display: 'flex', 
              float:'right'}}
              >
              <Pagination 
                count={page} 
                variant="outlined" 
                onClick={handlePage}
              />
            </Stack>

          </TabPanel>
          <TabPanel value="2">
            { tab === 'add' ? 
            <Box sx={{ backgroundColor: '#FFF',}} borderRadius={4}>
              <Box mb={2}>
                <TextField 
                  label="Title" 
                  fullWidth 
                  variant="filled"
                  value={article.title}
                  onChange={(e) => dispatch(createData({...article, title: e.target.value}))}
                  >
                  
                </TextField>
              </Box>
              <Box mb={2}>
                <TextField 
                  label="Content" 
                  fullWidth 
                  variant="filled"
                  value={article.content}
                  onChange={(e) => dispatch(createData({...article, content: e.target.value}))}
                  >
                    
                </TextField>
              </Box>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ background: '#51B15C', mr: 2,}}
                onClick={handleAdd}>
                Save
              </Button>
              <Button 
                size="large" 
                color='error' 
                variant="contained" 
                onClick={handleCancel}
                sx={{'&:hover' : '#AB1313'}}>
                Cancel
              </Button>
            </Box> : 
            <Box sx={{ backgroundColor: '#FFF',}} borderRadius={4}>
              <Box mb={2}>
                <TextField 
                  label="Title" 
                  fullWidth 
                  variant="filled"
                  value={articleEdit?.title}
                  onChange={(e) => dispatch(loadDataDetail({...articleEdit, title: e.target.value}))}
                  
                  >
                  
                </TextField>
              </Box>
              <Box mb={2}>
                <TextField 
                  label="Content" 
                  fullWidth 
                  variant="filled"
                  value={articleEdit?.content}
                  onChange={(e) => dispatch(loadDataDetail({...articleEdit, content: e.target.value}))}
                  >
                    
                </TextField>
              </Box>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ background: '#51B15C', mr: 2,}}
                onClick={()=>handleUpdate(articleEdit?.id)}>
                
                Edit
              </Button>
              <Button 
                size="large" 
                color='error' 
                variant="contained" 
                onClick={handleCancel}
                sx={{'&:hover' : '#AB1313'}}>
                Cancel
              </Button>
            </Box>
              }
          </TabPanel>
        </TabContext>
        <ConfirmDialog 
          open={open} 
          data={id} 
          handleDelete={handleDestroy} 
          setOpen={setOpen} 
        />
      </Box>
    </div>
  )
}

export default Article