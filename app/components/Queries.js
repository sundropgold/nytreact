/*
	================== QUERIES COMPONENT ==================
*/

// DEPENDENCIES
// ==================

var React = require("react");

// QUERIES COMPONENT
// ==================
// handles the search form

var Queries = React.createClass({

	// initial state
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	},

	// handleChange
	handleChange: function(event){
		// capture any change in the text inputs
		var newState = {};

		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},

	// handleSubmit
	handleSubmit: function(event){

		event.preventDefault();

		// search with the new query terms
		this.props.newSearch(this.state.topic, this.state.startYear, this.state.endYear);
		
		// empty query terms
		this.setState({
			topic:"",
			startYear:"",
			endYear:""
		});
	},

	// render component
	render: function(){
		return(
			<div>
				<div className="panel panel-default">
						
					<div className="panel-heading">
						<h2 className="panel-title">Search</h2>
					</div>

					<div className="panel-body">
						<form onSubmit={this.handleSubmit}>
							{/* Topic */}
							<div className="form-group">
								<label>
									Topic
								</label>

								<br/>
								
								<input type="text"
								value={this.state.topic}
								id="topic"
								onChange={this.handleChange}
								/>
							</div>

							{/* Start Year */}
							<div className="form-group">
								<label>
									Start Year
								</label>

								<br/>
								
								<input type="text" 
								value={this.state.startYear}
								id="startYear"
								onChange={this.handleChange}
								/>
							</div>

							{/* End Year */}
							<div className="form-group">
								<label>
									End Year
								</label>

								<br/>
								
								<input type="text"
								value={this.state.endYear}
								id="endYear"
								onChange={this.handleChange}
								/>
							</div>

							<button type="submit" className="btn btn-default">Search</button>
						</form>
					</div>
						
				</div>
			</div>
		);
	}
});

module.exports = Queries;