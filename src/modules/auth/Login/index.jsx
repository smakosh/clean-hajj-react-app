import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, renderComponent, branch } from 'recompose'
import { Input, Button, Error, Loader, Card, Container } from '../../common'
import { login } from '../actions'
import '../styles.scss'

class Login extends Component {
	state = {
		email: '',
		password: '',
		emailError: false,
		passwordError: false,
		error: undefined
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.error) {
			this.setState({ error: nextProps.auth.error })
		}
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password } = this.state
		const { login } = this.props
		if (!this.validateEmail(email)) {
			this.setState({ emailError: 'Invalid email' })
		} else if (email === '') {
			this.setState({ emailError: 'Email is required' })
		} else if (password === '') {
			this.setState({ passwordError: 'Password is required' })
		} else {
			this.setState({ emailError: false, passwordError: false, error: undefined })
			console.log(email, password)
			login(email, password)
		}
	}

	validateEmail = emailToBeValidate => {
		const RE = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		return RE.test(emailToBeValidate)
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	render() {
		const { email, password, emailError, passwordError, error } = this.state
		return (
			<Container className="auth">
				<Card>
					<form onSubmit={this.onSubmit}>
						<Input label="Email" type="email" name="email" value={email} onChange={this.handleChange} error={emailError} />
						<Input label="Password" type="password" name="password" value={password} onChange={this.handleChange} error={passwordError} />
						{error !== undefined && <Error>{error}</Error>}
						<div className="center">
							<Button type="submit">Login</Button>
						</div>
						<p className="center">Don't have an account? no worries! please <Link to="/register">Create one</Link></p>
					</form>
				</Card>
			</Container>
		)
	}
}

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps, { login }),
	branch(
		({ auth }) => auth === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Login)
