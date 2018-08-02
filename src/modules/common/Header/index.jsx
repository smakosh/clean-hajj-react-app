import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/actions'
import { Container, Button } from '../../common'
import './styles.scss'

const Header = ({ logout, auth }) => (
	<div className="header-container">
		<Container className="header">
			<h2>
				<Link to="/dashboard" style={{ textDecoration: 'none', color: '#212121' }}>Cleanify</Link>
			</h2>
			<div className="left">
				<Link to="/profile">
					<img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="avatar" />
				</Link>
				<p>Hello {auth.user.username}!</p>
				{auth.user.type === 'customer' && <p>{auth.user.points} points</p>}
				<Button onClick={logout}>Logout</Button>
			</div>
		</Container>
	</div>
)

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps, { logout }),
	branch(
		({ auth }) => !!auth.loading || !auth,
		renderNothing()
	)
)

export default enhance(Header)
