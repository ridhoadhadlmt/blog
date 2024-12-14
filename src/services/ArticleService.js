import http from '../AxiosTest'
const resource = '/api/articles'

export const getAll = (params) => 
    http.get(`${resource}` ,{params})

export const create = (data) => 
    http.post(`${resource}`, data)
    
export const getById = id => 
    http.get(`${resource}/${id}`)

export const update = (data, id) => 
    http.put(`${resource}/${id}`, data)

export const destroy = (id) => 
    http.delete(`${resource}/${id}`)

export const ArticleService = {
    getAll,
    create,
    getById,
    update,
    destroy,
}

export default ArticleService