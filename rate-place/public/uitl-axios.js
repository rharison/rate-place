import axios from 'axios'
const BASE_URL = 'http://192.168.1.102:3333'


function getOptionsToRequest(nameFunction) {
  const optionsByFunction = {
    getPlace: () => {
      const path = '/place'

      return {
        url: BASE_URL+path,
        method: 'GET',
      }
    }
  }

  return optionsByFunction[nameFunction]()
}

export async function getPlace() {
  const options = getOptionsToRequest('getPlace')
  const { data: place } = await axios(options)

  if(place) {
    return place
  }

  return null
}

export default {
  getPlace
}