import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, renderComponent, branch } from 'recompose'
import { Input, Button, Error, Loader, Card, Container } from '../../common'
import { register } from '../actions'
import '../styles.scss'

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		emailError: false,
		passwordError: false,
		firstNameError: false,
		lastNameError: false,
		usernameError: false,
		error: undefined
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.error) {
			this.setState({ error: nextProps.auth.error })
		}
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password, firstName, lastName, username, confirmPassword } = this.state
		const { register } = this.props
		if (!this.validateEmail(email)) {
			this.setState({ emailError: 'Invalid email' })
		} else if (firstName === '') {
			this.setState({ firstNameError: 'firstName is required' })
		} else if (lastName === '') {
			this.setState({ lastNameError: 'lastName is required' })
		} else if (username === '') {
			this.setState({ usernameError: 'username is required' })
		} else if (email === '') {
			this.setState({ emailError: 'Email is required' })
		} else if (password === '') {
			this.setState({ passwordError: 'Password is required' })
		} else if (password !== confirmPassword) {
			this.setState({ confirmPasswordError: 'Passwords don\'t match' })
		} else {
			this.setState({ emailError: false, passwordError: false, error: undefined })
			register(firstName, lastName, username, email, password)
		}
	}

	validateEmail = emailToBeValidate => {
		const RE = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		return RE.test(emailToBeValidate)
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	render() {
		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			username,
			emailError,
			passwordError,
			firstNameError,
			lastNameError,
			usernameError,
			confirmPasswordError,
			error
		} = this.state
		return (
			<Container className="auth">
				<Card>
					<form onSubmit={this.onSubmit}>
						<Input type="text" label="First name" name="firstName" value={firstName} onChange={this.handleChange} error={firstNameError} />
						<Input type="text" label="Last name" name="lastName" value={lastName} onChange={this.handleChange} error={lastNameError} />
						<Input type="text" label="Username" name="username" value={username} onChange={this.handleChange} error={usernameError} />
						<Input type="text" label="Email" name="email" value={email} onChange={this.handleChange} error={emailError} />
						<Input type="password" label="Password" name="password" value={password} onChange={this.handleChange} error={passwordError} />
						<Input type="password" label="Confirm password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} error={confirmPasswordError} />
						{error !== undefined && <Error>{error}</Error>}
						<div className="center">
							<Button type="submit">Register</Button>
						</div>
						<p className="center">Already have an account? no worries! please <Link to="/">Login</Link></p>
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
	connect(mapStateToProps, { register }),
	branch(
		({ auth }) => auth === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Register)