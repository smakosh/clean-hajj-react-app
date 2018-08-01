import React from 'react'
import cx from 'classnames'
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
			<div className={cx({ 'flexed-buttons': edit })}>
				<Button onClick={itemOnMap} className={cx({ mb1: edit })}>Check on map</Button>
				{edit && <Button href={`/edit-trashcan/${id}`}>Edit</Button>}
			</div>
			<div style={{ textAlign: 'right' }}>
				{!filled && <Button onClick={edit ? report : checkFilled}>Mark as Filled</Button>}
			</div>
		</div>
	</Card>
)

export default Item
