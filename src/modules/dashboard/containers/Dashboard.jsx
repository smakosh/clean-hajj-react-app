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
			trashcans: props.trashcan.trashcans || undefined,
			selectedTrashcan: props.trashcan.trashcans[0] || undefined
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
					isEmpty(trashcans) ? (
						<div style={{ textAlign: 'center' }}>
							<h2>No trashcans are available right now, start adding a new one!</h2>
							<Button href="/add-trashcan">Add trashcan</Button>
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
								) : (
									<Item
										{...selectedTrashcan}
										itemOnMap={this.itemOnMap}
										checkFilled={() => this.checkFilled(selectedTrashcan.id)}
										edit
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
		componentDidMount() {
			this.props.getTrashCans()
		}
	}),
	branch(
		({ auth }) => auth.user === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Dashboard)
