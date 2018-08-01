import React from 'react'
import cx from 'classnames'
import { Container, Button, Input, Card } from '../../common'
import '../styles.scss'

const TrashcanForm = ({
	handleChange,
	onSubmit,
	errorName,
	errorType,
	errorLat,
	errorLng
}) => (
	<Container className="trashcan-container">
		<Card className="trashcan-form">
			<form onSubmit={onSubmit}>
				<Input name="name" onChange={handleChange} label="Name" error={errorName} />
				<select name="type" className={cx('select', { 'error-select': errorType })} onChange={handleChange}>
					{['glass', 'plastic', 'organic'].map(item => (
						<option value={item} key={item}>{item}</option>
					))}
				</select>
				<Input name="lat" onChange={handleChange} label="Lat" error={errorLat} />
				<Input name="lng" onChange={handleChange} label="Lng" error={errorLng} />
				<div className="center">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Card>
	</Container>
)

export default TrashcanForm
