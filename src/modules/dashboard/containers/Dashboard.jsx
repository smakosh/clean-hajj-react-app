import React, { Component } from 'react'
import { compose, branch, renderComponent } from 'recompose'
import cx from 'classnames'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { Loader, Button, Container } from '../../common'
import { getTrashcans, filledTrashcan, report } from '../actions'
import Item from '../components/Item'
import '../styles.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			trashcans: undefined,
			selectedTrashcan: undefined,
			loading: true
		}
	}

	componentDidMount() {
		this.props.getTrashcans()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.trashcan.trashcans) {
			this.setState({
				trashcans: nextProps.trashcan.trashcans,
				selectedTrashcan: nextProps.trashcan.trashcans[0],
				loading: false
			})
		}
	}

	checkFilled = id => this.props.filledTrashcan(id)

	report = id => this.props.report(id)

	render() {
		const { trashcans, selectedTrashcan, loading } = this.state
		const { auth } = this.props
		return (
			<React.Fragment>
				{loading ? (
					<Loader />
				) : (
					<Container className="dashboard-container">
						{
							trashcans === undefined || trashcans.isEmpty ? (
								<div className="empty-state">
									<div className="responsive-img">
										<img src="https://cdn.dribbble.com/users/231299/screenshots/4873214/garbage.png" alt="trashcans not available" />
									</div>
									<h2>No trashcans are available right now! {auth.user.typee === 'admin' && 'start adding a new one!'}</h2>
									{auth.user.type === 'admin' && <Button href="/add-trashcan">Add trashcan</Button>}
								</div>
							) : (
								<div className="trashcans-container-map">
									<div className="meh-trashcans">
										{
											auth.user.type === 'customer' ? (
												<Item
													{...selectedTrashcan}
													itemOnMap={this.itemOnMap}
													report={() => this.report(selectedTrashcan.id)}
												/>
											) : auth.user.type === 'admin' ? (
												<React.Fragment>
													<Item
														{...selectedTrashcan}
														checkFilled={() => this.checkFilled(selectedTrashcan.id)}
														edit
													/>
													<div style={{ marginTop: '2rem' }}>
														<Button href="/add-trashcan">Add trashcan</Button>
													</div>
												</React.Fragment>
											) : (
												<Item
													{...selectedTrashcan}
													checkFilled={() => this.checkFilled(selectedTrashcan.id)}
												/>
											)
										}
									</div>
									<div className="meh-map">
										{<Map {...selectedTrashcan}>
											{trashcans.map(trashcan => (
												<div
													key={trashcan._id}
													className={cx('marker', { 'marker-empty': !trashcan.filled, 'marker-filled': trashcan.filled })}
													lat={trashcan.lat}
													lng={trashcan.lng}
													text={trashcan.type.split('')[0].toUpperCase()}
												>{trashcan.type.split('')[0].toUpperCase()}</div>
											))}
										</Map>}
									</div>
								</div>
							)
						}
					</Container>
				)}
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, trashcan }) => ({
	auth,
	trashcan
})

const enhance = compose(
	connect(mapStateToProps, { getTrashcans, filledTrashcan, report }),
	branch(
		({ auth }) => auth.user === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Dashboard)
