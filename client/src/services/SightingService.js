const baseURL = 'http://localhost:3000/api/sightings/'

export default {

  // index
  getSightings(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  // post new
  postSighting(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },

  // delete sighting
  deleteSighting(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  }

}
