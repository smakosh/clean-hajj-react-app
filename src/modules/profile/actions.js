import axios from 'axios'

// const PROD_API = process.env.REACT_APP_PROD_API
const URL = 'http://localhost:5000'
// const URL = `https://cors-anywhere.herokuapp.com/${API}`

export const editProfile = (profile, history) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios.patch(`${URL}/api/user`, profile)
		.then(() =>  history.push('/profile'))
		.catch(err => dispatch({ type: 'EDIT_PROFILE_FAILED', payload: err.response.data }))
}
