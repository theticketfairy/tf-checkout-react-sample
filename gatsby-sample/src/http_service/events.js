import { baseRequest } from './config'


export const getEvent = async (slug, previewKey) => {
  // const isWindowDefined = typeof window !== 'undefined'
  // console.log(isWindowDefined)
    try {
      const headers = {}
     /* if (isWindowDefined) {
        headers['authorization-guest'] = window.localStorage.getItem('auth_guest_token')
      } */
  
      const res = await baseRequest.get(`/event/${slug}/?format=json&client=mana`, {
        params: {
          pk: previewKey
        },
        headers
      })
      const data = res.data
      return data
    } catch (e) {
      console.log('getEvent error', e)
      throw e
    }
  }