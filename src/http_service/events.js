import { baseRequest } from './config'


export const getEvent = async (slug, previewKey) => {
    try {
      const headers = {}
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