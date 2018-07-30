import React from 'react'
import { connect } from 'react-redux'
import { compose, renderComponent, branch, lifecycle } from 'recompose'
import { Button, Container, Loader } from '../common'
import './styles.scss'

const Profile = ({ auth }) => (
	<Container className="empty-profile">
		<h2>Welcome {`${auth.user.firstName} ${auth.user.lastName}`}</h2>
		<p>Points: {auth.user.points}</p>
		<div className="center">
			<Button href="/profile/edit">Edit profile</Button>
		</div>
	</Container>
)

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps),
	lifecycle({
		componentDidMount() {
			this.props.getProfile()
		}
	}),
	branch(
		({ auth }) => !!auth.loading || !auth,
		renderComponent(Loader)
	)
)

export default enhance(Profile)
