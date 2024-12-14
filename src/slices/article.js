import { createSlice } from "@reduxjs/toolkit";
import { getAll, getById, create, destroy, update} from '../services/ArticleService';
export const articleState = createSlice({
    name: 'article',
    initialState: {
        data: [],
        dataArticle: {
            id: null,
            title: '',
            content: '',
        },
        detail: null,
        tabPage: 'add',
        isLoading: false,
    },
    reducers: {
        loadData: (state, action) => {
            state.data = action.payload
        },
        loadDataDetail: (state, action) => {
            state.detail = action.payload
        },
        createData: (state, action) => {
            state.dataArticle = action.payload
        },
        editData: (state, action) => {
            state.dataArticle = action.payload
        },
        destroyData: (state, action) => {
            state.data = action.payload
        },
        changeTab: (state, action) => {
            state.tabPage = action.payload
        },
        clear: (state) => {
            state.data= [];
            state.dataArticle= {
                id: null,
                title: '',
                content: '',
            };
            state.detail= null;
        },
        isLoadingDelete: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {
    loadData, 
    loadDataDetail, 
    createData, 
    editData,
    destroyData,
    clear, 
    changeTab,
    isLoadingDelete 
    } = articleState.actions

export const getData = (state) => state.article.data
export const getDataDetail = (state) => state.article.detail
export const addData = (state) => state.article.dataArticle
export const updateData = (state) => state.article.dataArticle
export const tabPanel = (state) => state.article.tabPage
export const deleteData = (state) => state.article.data
export const isLoading = (state) => state.article.isLoading



export default articleState.reducer

export const fetchArticle = (params) => (dispatch) => {
    const getData = async() => {
        try {
            const {data:{data}} = await getAll(params)
            dispatch(loadData(data?.articles))            
        } catch (err) { 
            console.error(err)
        }
    }
    getData();
}

export const showArticle = (id) => (dispatch) => {
    const getDataDetail = async() => {

        try {
            const {data: {data}} = await getById(id)
            
            dispatch(loadDataDetail(data))
        } catch (error) {
            
        }
    }
    getDataDetail();
}

export const createDataArticle = (params) => (dispatch) => {
    const addData = async() => {
       
        dispatch(isLoadingDelete(true))
        try {
            await create(params)
            dispatch(isLoadingDelete(false))
            dispatch(clear())
          } catch (error) {
            console.error(error)
          }
    }
    addData();
}
export const updateDataArticle = (params,id) => (dispatch) => {
    const updateData = async() => {
        dispatch(isLoadingDelete(true))
        try {
            await update(params,id)
            dispatch(isLoadingDelete(false))
          } catch (error) {
            console.error(error)
          }
    }
    updateData();
}

export const destroyDataArticle = (id) => (dispatch) => {
    const deleteData = async() => {
        dispatch(isLoadingDelete(true))
        try {
            await destroy(id)
            dispatch(isLoadingDelete(false))
        } catch (error) {
            console.error(error)
        }
    }
    deleteData();
}





