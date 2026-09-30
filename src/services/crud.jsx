import axios from "axios"
const url = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(url)
}

const create = personObject => {
    return axios.post(url, personObject)
}

const remove = (id) => {
    return axios.delete(`${url}/${id}`)
}

const update = (id, personObject) => {
    return axios.put(`${url}/${id}`, personObject)
}

export default {
    getPersons: getPersons,
    create: create,
    remove: remove,
    update: update
}