import axios from 'axios'

const setWorkerHeader = worker => {
	if (worker) {
		axios.defaults.headers.common['worker-access'] = worker
	} else {
		delete axios.defaults.headers.common['worker-access']
	}
}

export default setWorkerHeader
