import React from 'react'
import Select from 'react-select'
import './styles.scss'

const options = [
	{ value: 'glass', label: 'Glass' },
	{ value: 'plastic', label: 'Plastic' },
	{ value: 'organic', label: 'Organic' }
]

const CustomSelect = ({ type, onChange }) => (
	<div className="select-field">
		<Select
			value={type}
			onChange={onChange}
			options={options}
		/>
	</div>
)

export { CustomSelect }
