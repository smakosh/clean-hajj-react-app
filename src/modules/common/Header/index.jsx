import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/actions'
import { Container, Button } from '../../common'
import './styles.scss'

const Header = ({ logout }) => (
	<div className="header-container">
		<Container className="header">
			<h2>
				<Link to="/dashboard" style={{ textDecoration: 'none', color: '#212121' }}>Clean Hajj</Link>
			</h2>
			<div className="left">
				<div className="avatar">
					<Link to="/profile">
						<img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="avatar" />
					</Link>
				</div>
				<Button onClick={logout}>Logout</Button>
			</div>
		</Container>
	</div>
)

export default connect(null, { logout })(Header)
