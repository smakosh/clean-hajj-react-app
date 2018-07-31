import isEmpty from '../../utils/isEmpty'

export default (state = { loading: false }, action) => {
	switch (action.type) {
	case 'ADD_TRASHCAN':
		return {
			...state,
			trashcans: action.payload,
			loading: false
		}
	case 'TRASHCAN_ERROR':
		return {
			error: action.error,
			loading: false
		}
	case 'GET_TRASHCANS':
		return {
			...state,
			trashcans: action.payload,
			isEmpty: !isEmpty(action.payload),
			loading: false
		}
	case 'GET_TRASHCAN_BY_ID':
		return {
			...state,
			trashcans: action.payload,
			loading: false
		}
	case 'CHECK_FILLED':
		return {
			...state,
			trashcans: action.payload,
			isEmpty: 
		}
	case 'DELETE_TRASHCAN':
		return  {
			trashcans: action.payload,
			isEmpty: !isEmpty(action.payload),
			loading: false
		}
	case 'LOADING':
		return {
			loading: true
		}
	default:
		return state
	}
}
