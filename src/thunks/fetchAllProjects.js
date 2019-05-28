import { isLoading, hasErrored, setProjects, setMaterials } from '../actions';

export const fetchAllProjects = () => {
  return async (dispatch) => {
    const url = "https://hometrackr.herokuapp.com//api/v1/graphql"
    try {
      dispatch(isLoading(true));
      const response = await fetch(url, {
        body: JSON.stringify({
          "query": "query { projects { id name description address rooms { id name type description }}}"
          }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      dispatch(isLoading(false))
      dispatch(setProjects(data.data.projects))
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}

export const fetchRoomMaterials = (id) => {
  return async (dispatch) => {
    const url = "https://hometrackr.herokuapp.com//api/v1/graphql"
    try {
      dispatch(isLoading(true));
      const response = await fetch(url, {
        body: JSON.stringify({
          "query": `query { getRoomsMaterials(room_id: ${id})}`
          }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      dispatch(isLoading(false))
      dispatch(setMaterials(data.data.getRoomsMaterials))
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}
