import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import setAdminHeader from '../../utils/setAdminHeader'
import setWorkerHeader from '../../utils/setWorkerHeader'
import { history } from '../../App'

const API = process.env.REACT_APP_PROD_API
// const API = 'http://localhost:5000'
const URL = `https://cors-anywhere.herokuapp.com/${API}`

export const verifyToken = token => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios({
		method: 'GET',
		url: `${URL}/api/user/me`,
		headers: {
			'Content-Type': 'application/json',
			'x-auth': token
		}
	}).then(res => {
		setAuthToken(token)
		dispatch({ type: 'SAVE_USER', payload: res.data })
		history.push('/profile')
	})
		.catch(() => dispatch({ type: 'SAVE_USER', payload: {} }))
}

export const register = (firstName, lastName, username, email, password) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios.post(`${URL}/api/user/register`, { firstName, lastName, username, email, password })
		.then(res => {
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)

			if (res.data.type === 'admin') {
				setAdminHeader(token)
				setWorkerHeader(token)
			} else if (res.data.type === 'worker') {
				setWorkerHeader(token)
			}

			dispatch({ type: 'SAVE_USER', payload: res.data })
			history.push('/profile')
		})
		.catch(err => dispatch({ type: 'AUTH_FAILED', payload: err.response.data }))
}

export const login = (email, password) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios.post(`${URL}/api/user/login`, { email, password })
		.then(res => {
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)

			if (res.data.type === 'admin') {
				setAdminHeader(token)
				setWorkerHeader(token)
			} else if (res.data.type === 'worker') {
				setWorkerHeader(token)
			}

			dispatch({ type: 'SAVE_USER', payload: res.data })
			history.push('/profile')
		})
		.catch(err => dispatch({ type: 'AUTH_FAILED', payload: err.response.data }))
}

export const logout = () => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios.delete(`${URL}/api/user/me/token`)
		.then(() => {
			localStorage.removeItem('jwtToken')
			setAuthToken(false)
			dispatch(({ type: 'SAVE_USER', payload: {} }))
			history.push('/')
		})
		.catch(err => console.log(err))
}
