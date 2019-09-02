import { isLoading, hasErrored, setProjects, deleteAProject, deleteARoom, deleteAMaterial } from '../actions';

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

export const deleteProject = (id) => {
  return async (dispatch) => {
    const url = "https://hometrackr.herokuapp.com//api/v1/graphql"
    try {
      dispatch(isLoading(true));
      const response = await fetch(url, {
        body: JSON.stringify({"query":`mutation{deleteProject(id: "${id}" )}`
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
      dispatch(deleteAProject(id))
      dispatch(isLoading(false))
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}

export const deleteRoom = (id, projectId) => {
  return async (dispatch) => {
    const url = "https://hometrackr.herokuapp.com//api/v1/graphql"
    try {
      dispatch(isLoading(true));
      const response = await fetch(url, {
        body: JSON.stringify({"query":`mutation{deleteRoom(id: "${id}" )}`
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
      dispatch(deleteARoom(id, projectId))
      dispatch(isLoading(false))
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}

export const deleteMaterial = (materialType, id) => {
  return async (dispatch) => {
    const url = "https://hometrackr.herokuapp.com//api/v1/graphql"
    try {
      dispatch(isLoading(true));
      const response = await fetch(url, {
        body: JSON.stringify({"query":`mutation{deleteRoomMaterial(id: "${id}" )}`
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
      dispatch(deleteAMaterial(materialType, id))
      dispatch(isLoading(false))
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}