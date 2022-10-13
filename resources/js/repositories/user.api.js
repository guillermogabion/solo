import axios from '../plugins/axios'

export const login = (payload) => axios.post('login', payload)
export const Self = () => axios.get('self')