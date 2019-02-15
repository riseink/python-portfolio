// Sample React-Redux Component
// ----------------------------
// Example of a React component that's connected to the Redux store and receiving
// the entire state as props.

import React from "react"
import { connect } from "react-redux"

export class ExampleComponent extends React.Component {
	render() {
		return (
			<div className="ExampleComponent">
				I am a React component
				<br />
				My props: {JSON.stringify(this.props)}
			</div>
		)
	}
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ExampleComponent)
