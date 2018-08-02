import React from 'react'
import customerAvatar from './assets/customer.svg'
import workerAvatar from './assets/worker.svg'
import adminAvatar from './assets/admin.svg'
import './styles.scss'

const types = {
	customer: { img: customerAvatar },
	worker: { img: workerAvatar },
	admin: { img: adminAvatar }
}

const Avatar = ({ type }) => {
	const element = types[type]
	if (element) {
		return (
			<img
				alt={type}
				src={element.img}
				className="avatar"
				width="60"
				height="60"
			/>
		)
	}
	return null
}

export { Avatar }
