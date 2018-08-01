import React, { Component } from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { Loader, Button, Container } from '../../common'
import { getTrashCans, filledTrashcan, report } from '../actions'
import isEmpty from '../../../utils/isEmpty'
import Item from '../components/Item'
import '../styles.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			trashcans: isEmpty(props.trashcan) ? props.trashcan.trashcans : undefined,
			selectedTrashcan: isEmpty(props.trashcan) ? props.trashcan.trashcans[0] : undefined
		}
	}

	itemOnMap = id => this.setState({ selectedTrashcan: id })

	checkFilled = id => this.props.filledTrashcan(id)

	report = id => this.props.report(id)

	render() {
		const { trashcans, selectedTrashcan } = this.state
		const { auth } = this.props
		return (
			<Container className="dashboard-container">
				{
					isEmpty(trashcans) || trashcans === undefined ? (
						<div className="empty-state">
							<div className="responsive-img">
								<img src="https://cdn.dribbble.com/users/231299/screenshots/4873214/garbage.png" alt="trashcans not available" />
							</div>
							<h2>No trashcans are available right now! {auth.user.typee === 'admin' && 'start adding a new one!'}</h2>
							{auth.user.type === 'admin' && <Button href="/add-trashcan">Add trashcan</Button>}
						</div>
					) : (
						<div>
							{
								auth.user.type === 'customer' ? (
									<Item
										{...selectedTrashcan}
										itemOnMap={this.itemOnMap}
										report={() => this.report(selectedTrashcan.id)}
									/>
								) : auth.user.type === 'admin' ? (
									<Item
										{...selectedTrashcan}
										itemOnMap={this.itemOnMap}
										checkFilled={() => this.checkFilled(selectedTrashcan.id)}
										edit
									/>
								) : (
									<Item
										{...selectedTrashcan}
										itemOnMap={this.itemOnMap}
										checkFilled={() => this.checkFilled(selectedTrashcan.id)}
									/>
								)
							}
							{/* handle this shit later on <Map /> */}
						</div>
					)
				}
			</Container>
		)
	}
}

const mapStateToProps = ({ auth, trashcan }) => ({
	auth,
	trashcan
})

const enhance = compose(
	connect(mapStateToProps, { getTrashCans, filledTrashcan, report }),
	lifecycle({
		componentWillMount() {
			this.props.getTrashCans()
		}
	}),
	branch(
		({ auth }) => auth.user === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Dashboard)
