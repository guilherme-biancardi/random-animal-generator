import axios from 'axios'

const axiosConfig = axios.create({ baseURL: 'https://zoo-animal-api.herokuapp.com/animals' })

export const useIndex = () => ({
    axios: axiosConfig
})