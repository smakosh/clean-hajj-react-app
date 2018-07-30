import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { compose, branch, renderComponent } from 'recompose'
import { Loader, Header } from '../modules/common'

const Private = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (auth.isLoggedIn ? (
			<React.Fragment>
				<Header />
				<Component {...props} />
			</React.Fragment>
		) : (
			<Redirect to="/" />
		))
		}
	/>
)

const mapStateToProps = state => ({
	auth: state.auth
})

const enhance = compose(
	connect(mapStateToProps),
	branch(
		props => props.auth.loading === undefined || props.auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Private)
