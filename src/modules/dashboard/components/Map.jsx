import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import '../styles.scss'

export default class Map extends Component {
	static defaultProps = {
		center: [21.4151878, 39.8789227],
		zoom: 14
	}

	render() {
		return (
			<div className="google-map">
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					$hover={false}
				>
					{this.props.children}
				</GoogleMapReact>
			</div>
		)
	}
}
