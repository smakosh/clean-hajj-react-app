import axios from 'axios'
import { history } from '../../App'

const API = process.env.REACT_APP_PROD_API
// const API = 'http://localhost:5000'
const URL = `https://cors-anywhere.herokuapp.com/${API}`

export const trashcanError = err => dispatch => {
	dispatch({
		type: 'TRASHCAN_ERROR',
		error: err.response.data
	})
}

export const getTrashcans = () => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.get(`${URL}/api/trashcan/`)
		.then(res => dispatch({
			type: 'GET_TRASHCANS',
			payload: res.data
		}))
		.catch(err => dispatch(trashcanError(err)))
}

export const addNewTrashCan = (name, type, lat, lng) => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.post(`${URL}/api/trashcan`, { name, type, lat, lng })
		.then(res => dispatch({
			type: 'ADD_TRASHCAN',
			payload: res.data
		}))
		.catch(err => dispatch(trashcanError(err)))
}

export const editTrashcan = (id, name, type, lat, lng) => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.patch(`${URL}/api/trashcan/${id}`, { name, type, lat, lng })
		.then(() => {
			dispatch({
				type: 'CLEAR_TRASHCANS',
				payload: {}
			})
			history.push('/dashboard')
		})
		.catch(() => history.push('/dashboard'))
}

export const filledTrashcan = id => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.patch(`${URL}/api/trashcan/filled/${id}`)
		.then(() => {
			dispatch({
				type: 'CLEAR_TRASHCANS',
				payload: {}
			})
			history.push('/dashboard')
		})
		.catch(() => history.push('/dashboard'))
}

export const report = id => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.patch(`${URL}/api/trashcan/report/${id}`)
		.then(() => {
			dispatch({
				type: 'CLEAR_TRASHCANS',
				payload: {}
			})
			history.push('/dashboard')
		})
		.catch(() => history.push('/dashboard'))
}

export const getTrashcanById = id => dispatch => {
	dispatch({ type: 'LOADING' })
	axios.get(`${URL}/api/trashcan/${id}`)
		.then(res => dispatch({
			type: 'GET_TRASHCAN_BY_ID',
			payload: res.data
		}))
		.catch(err => dispatch(trashcanError(err)))
}

export const deleteTrashcan = (id, data) => dispatch => {
	dispatch({ type: 'LOADING' })
	const newStudents = data.filter(({ _id }) => _id !== id)
	axios.delete(`${URL}/api/trashcan/${id}`)
		.then(() => dispatch({
			type: 'DELETE_TRASHCAN',
			payload: newStudents
		}))
		.catch(err => dispatch(trashcanError(err)))
}
