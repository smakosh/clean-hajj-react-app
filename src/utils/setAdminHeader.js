import axios from 'axios'

const setAdminHeader = admin => {
	if (admin) {
		axios.defaults.headers.common['admin-access'] = admin
	} else {
		delete axios.defaults.headers.common['admin-access']
	}
}

export default setAdminHeader
