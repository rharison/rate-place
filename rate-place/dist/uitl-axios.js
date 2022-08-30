import axios from 'axios'
const BASE_URL = 'http://192.168.1.102:3333'


function getOptionsToRequest(nameFunction, place, evaluated, category) {
  const optionsByFunction = {
    getPlace: () => {
      const path = '/place'

      return {
        url: BASE_URL+path,
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

export default {
  getPlace,
  setEvaluatedPlace,
  setEvaluatedCategory
}