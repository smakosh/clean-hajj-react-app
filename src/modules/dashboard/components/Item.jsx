import React from 'react'
import cx from 'classnames'
import { Button, Card } from '../../common'
import '../styles.scss'

const Item = ({ id, name, date, lat, lng, filled, edit, checkFilled, report }) => {
	const dateObject = new Date(Date.parse(date))
	const dateReadable = dateObject.toDateString()
	return (
		<Card className="card-item">
			<h4>Name: {name}</h4>
			<p>Created at: {dateReadable}</p>
			<p>Lat: {lat}</p>
			<p>Lng: {lng}</p>
			{/* <div>
				<img src={} alt=""/>
			</div> */}
			<div className="item-details">
				<div className={cx({ 'flexed-buttons': edit })}>
					{edit && <Button href={`/edit-trashcan/${id}`}>Edit</Button>}
				</div>
				<div style={{ textAlign: 'right' }}>
					{!filled && <Button onClick={edit ? report : checkFilled}>Mark as Filled</Button>}
				</div>
			</div>
		</Card>
	)
}

export default Item
