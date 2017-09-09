/*
	================== SAVED COMPONENT ==================
*/

// DEPENDENCIES
// ==================

var React = require("react");
var helpers = require("./utils/helpers.js");

// SAVED COMPONENT
// ==================

var Saved = React.createClass({

	// saved articles are passed down from search
	getInitialState: function(){
		return {
			articles:[]
		};

		// bind to the component
		this.deleteArticle = this.deleteArticle.bind(this);
	},

	// the moment the page renders see if there are any articles yet
	componentDidMount: function(){

		// use helper function to get Articles
		helpers.getSavedArticles().then(function(response){

			// save articles into state
			this.setState({
				articles:response
			});
		});
	},

	// delete a saved article from the db
	deleteArticle:function(event){

		// get id to delete
		var deleteThisArticle = event.target.value;

		// use helper function to delete Articles
		helpers.deleteSavedArticle(deleteThisArticle).then(function(){

			// re-render the articles minus the deleted article
			helpers.getSavedArticles().then(function(response){

				// updated articles state
				this.setState({
					articles:response
				});
			});
		});
	},

	// render
	render:function(){

		if (this.props.articles) {
			return(
				<div>

					<div className="container" id="saved-div">
						<div className="panel panel-default">

							<div className="panel-heading">
								<h2 className="panel-title">Saved Articles</h2>
							</div>

							<div className="panel-body">
								{
									this.props.articles.map(function(saved, i){

										<div className="well" key={i}>

											<h4><a href={saved.web_url} target="_blank">{saved.headline.main}</a></h4>
											<p>Published: {saved.pub_date}</p>

											<button
											value = {i} 
											className = "btn btn-default"
											onClick = {this.state.deleteArticle}>
											Delete
											</button>
										</div>

									})
								}
							</div>

						</div>
					</div>

				</div>
			);
		}

		else {
			return (
				<div>
					<div className="panel default-panel">
						
						<div className="panel-body">
							<h4 className="panel-title">No Saved Articles</h4>
						</div>
					</div>
				</div>
			);
		}
	}
});

module.exports = Saved;