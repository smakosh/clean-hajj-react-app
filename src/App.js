import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import store from './store'
import Private from './Routes/Private'
import Public from './Routes/Public'
import { verifyToken } from './modules/auth/actions'

import Login from './modules/auth/Login'
import Register from './modules/auth/Register'
import Dashboard from './modules/dashboard/containers/Dashboard'
import Profile from './modules/profile/Profile'
import EditProfile from './modules/profile/EditProfile'
/* import AddWorker from './modules/workers/containers/AddWorker'
import EditWorker from './modules/workers/containers/EditWorker'
import AddTrashcan from './modules/workers/containers/AddTrashcan'
import EditTrashcan from './modules/workers/containers/EditTrashcan' */
import { NotFound } from './modules/common'
import './main.scss'

export const history = createHistory()

try {
	if (localStorage.jwtToken) {
		store.dispatch(verifyToken(localStorage.jwtToken))
	}
} catch (e) {
	if (history.location.pathname !== '/') {
		history.push('/')
	}
}

const AppRoutes = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Public path="/" exact component={Login} />
				<Public path="/register" exact component={Register} />
				<Private path="/dashboard" exact component={Dashboard} />
				<Private path="/profile" exact component={Profile} />
				<Private path="/profile/edit" exact component={EditProfile} />
				{/* Other routes */}
				{/* <Private path="/add-worker" component={AddWorker} />
				<Private path="/edit-worker/:id" component={EditWorker} />
				<Private path="/add-trashcan" component={AddTrashcan} />
				<Private path="/edit-trashcan/:id" component={EditTrashcan} /> */}
				<Public component={NotFound} />
			</Switch>
		</Router>
	</Provider>
)

export default AppRoutes
