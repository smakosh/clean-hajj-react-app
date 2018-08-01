import React from 'react'
import { Button, Card } from '../../common'
import '../styles.scss'

const Item = ({ id, name, type, lat, lng, filled, edit, itemOnMap, checkFilled, report }) => (
	<Card className="card-item">
		<h4>{name}</h4>
		<p>{type}</p>
		<p>{lat}</p>
		<p>{lng}</p>
		{/* <div>
            <img src={} alt=""/>
        </div> */}
		<div className="item-details">
			<Button onClick={itemOnMap}>Check on map</Button>
			{!filled && <Button onClick={edit ? report : checkFilled}>Mark as Filled</Button>}
			{edit && <Button href={`/edit-trashcan/${id}`}>Edit</Button>}
		</div>
	</Card>
)

export default Item
