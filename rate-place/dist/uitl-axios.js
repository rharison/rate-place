import axios from 'axios'
const BASE_URL = 'http://192.168.1.102:3333'


function getOptionsToRequest(nameFunction, place, evaluated, category, type) {
  const optionsByFunction = {
    getPlace: () => {
      const endpointByType = {
        normal: '/place',
        maybe: '/place/evaluated/maybe',
        false: '/place/evaluated/false',
      }

      const endpoint = endpointByType[type]

      return {
        url: BASE_URL+endpoint,
        method: 'GET',
      }
    },
    setEvaluatedPlace: () => {
      const path = `/place/evaluated/${evaluated}`

      return {
        url: BASE_URL+path,
        method: 'POST',
        data: place
      }
    },
    setEvaluatedCategory: () => {
      const path = `/place/category/${category}/evaluated/${evaluated}`

      return {
        url: BASE_URL+path,
        method: 'POST',
      }
    },
    getEvaluateds: () => {
      const path = '/place/evaluateds'

      return {
        url: BASE_URL+path,
        method: 'GET',
      }
    }
  }

  return optionsByFunction[nameFunction]()
}

export async function getPlace(type) {
  const options = getOptionsToRequest('getPlace', null, null, null, type)
  const { data: place } = await axios(options)

  if(place) {
    return place
  }

  return null
}

export async function setEvaluatedPlace(place, evaluated) {
  try {
    const options = getOptionsToRequest('setEvaluatedPlace', place, evaluated)

    const { data: res } = await axios(options)

    return res
  } catch(err) {
    return new Error(err)
  }
}

export async function setEvaluatedCategory(category, evaluated) {
  try {
    const options = getOptionsToRequest('setEvaluatedCategory', null, evaluated, category)

    const { data: res } = await axios(options)

    return res
  } catch(err) {
    return new Error(err)
  }
}

export async function getEvaluateds() {
  try {
    const options = getOptionsToRequest('getEvaluateds')

    const { data: res } = await axios(options)

    return res
  } catch(err) {
    return new Error(err)
  }
}

export default {
  getPlace,
  setEvaluatedPlace,
  setEvaluatedCategory,
  getEvaluateds
}