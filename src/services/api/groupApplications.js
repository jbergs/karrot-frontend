import axios from '@/services/axios'

export default {
  async create (data) {
    return convert((await axios.post('/api/group-applications/', data)).data)
  },

  // TODO: create applicationChat which will use this service method:
  // async get (data) {
  //   return (await axios.get('/api/group-applications/{id}/', data)).data
  // },

  async list (filter) {
    return convert((await axios.get('/api/group-applications/', { params: filter })).data)
  },

  async accept (applicationId) {
    return convert((await axios.post(`/api/group-applications/${applicationId}/accept/`)).data)
  },

  async decline (applicationId) {
    return convert((await axios.post(`/api/group-applications/${applicationId}/decline/`)).data)
  },

  async withdraw (applicationId) {
    return convert((await axios.post(`/api/group-applications/${applicationId}/withdraw/`)).data)
  },
}

export function convert (val) {
  if (Array.isArray(val)) {
    return val.map(convert)
  }
  else {
    let createdAt = new Date(val.createdAt)
    return { ...val, createdAt }
  }
}
