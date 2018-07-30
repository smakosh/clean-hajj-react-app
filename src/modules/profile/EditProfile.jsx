import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, branch, renderComponent } from 'recompose'
import { editProfile } from './actions'
import ProfileForm from './components/ProfileForm'
import { Loader } from '../common'
import isEmpty from '../../utils/isEmpty'

class EditProfile extends Component {
    state = {
    	handle: '',
    	loading: false,
    	error: undefined
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.profile.error) {
    		this.setState({ error: nextProps.profile.error })
    	}

    	if (nextProps.auth.auth) {
    		const { auth } = nextProps.auth

    		auth.handle = !isEmpty(auth.handle) ? auth.handle : ''

    		this.setState({
    			handle: auth.handle,
    			loading: false
    		})
    	}
    }

    onSubmit = e => {
    	e.preventDefault()
    	this.setState({ loading: true })
    	const { editProfile, history } = this.props
    	const { handle } = this.state
    	const profileData = { handle }
    	editProfile(profileData, history)
    	this.setState({ loading: false })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
    	return (
    		<React.Fragment>
    			{this.state.loading ? (
    				<Loader />
    			) : (
    				<ProfileForm
    					{...this.state}
    					handleChange={this.handleChange}
    					onSubmit={this.onSubmit}
    				/>
    			)}
    		</React.Fragment>
    	)
    }
}

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	withRouter,
	connect(mapStateToProps, { editProfile }),
	branch(
		({ auth }) => auth === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(EditProfile)
