/*
	================== RESULTS COMPONENT ==================
*/

// DEPENDENCIES
// ==================

var React = require("react");

// RESULTS COMPONENT
// ==================

var Results = React.createClass({

	render: function(){

		return (
			<div>
				<div className="panel panel-default">

					<div className="panel-heading">
						<h2 className="panel-title">Results</h2>
					</div>

					<div className="panel-body">
					{
						this.props.articles.map(function(searched, i){

							return(
								<div className="well" key={i}>

									<h4><a href={searched.web_url} target="_blank">{searched.headline.main}</a></h4>
									<p>Published: {searched.pub_date}</p>

									<button
										value = {i} 
										className = "btn btn-default"
										onClick = {this.props.newArticle}>
										Save
									</button>
								</div>
							);
						}.bind(this))
					}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Results;