import React, { Component } from 'react'

import RNI from 'react-numeric-input'

export default class App extends Component {
	render () {
		return (
			<div style={{padding:'50px'}}>
				<RNI value={30} mobile={true} />
			</div>
		)
	}
}
