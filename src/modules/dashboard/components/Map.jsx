import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import '../styles.scss'

export default class Map extends Component {
	static defaultProps = {
		center: [21.6168223, 39.1564055],
		zoom: 14
	}

	onBoundsChange = () => console.log('test')

	render() {
		return (
			<div className="google-map">
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
					defaultCenter={this.props.center}
					center={this.props.center}
					defaultZoom={this.props.zoom}
					$hover={false}
					nBoundsChange={this.onBoundsChange}
					onChildClick={this.onBoundsChange}
					onChildMouseEnter={this.onBoundsChange}
					onChildMouseLeave={this.onBoundsChange}
				>
					{this.props.children}
				</GoogleMapReact>
			</div>
		)
	}
}
