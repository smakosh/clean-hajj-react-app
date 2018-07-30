import React from 'react'
import cx from 'classnames'
import './styles.scss'

const Input = ({ type, name, value, onChange, label, error }) => (
	<div className="input-field">
		<label>{label}</label>
		<input placeholder={label} type={type} name={name} value={value} onChange={onChange} className={cx({ 'red-border': !!error })} />
		{error && <span>{error}</span>}
	</div>
)

export { Input }
