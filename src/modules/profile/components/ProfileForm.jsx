import React, { Component } from 'react'
import { Container, Card, Button, Input } from '../../common'
import '../styles.scss'

class ProfileForm extends Component {
	render() {
		const {
			handle,
			error
		} = this.props
		return (
			<Container className="profile-form">
				<Card>
					<form>
						<Input type="text" name="handle" value={handle} onChange={this.handleChange} error={error} />
						<div className="center">
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Card>
			</Container>
		)
	}
}

export default ProfileForm
