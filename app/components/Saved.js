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

			if (response !== this.state.articles){
				this.setState({
					articles:response
				});				
			}


		}.bind(this));
	},

	// delete a saved article from the db
	deleteArticle:function(event){

		// get id to delete
		var deleteID = event.target.value;

		// use helper function to delete Articles
		helpers.deleteSavedArticle(deleteID).then(function(response){

			// re-render the articles minus the deleted article
			helpers.getSavedArticles().then(function(response){

				// updated articles state
				this.setState({
					articles:response
				});

			}.bind(this));

		}.bind(this));
	},

	// render
	render:function(){

		if (!this.props.articles) {
			return(
				<div>

					<div className="container" id="saved-div">
						<div className="panel panel-default">

							<div className="panel-heading">
								<h2 className="panel-title">Saved Articles</h2>
							</div>

							<div className="panel-body">
								{
									this.state.articles.map(function(saved){

										return (
											<div className="well" key={saved._id}>

												<h4><a href={saved.url} target="_blank">{saved.title}</a></h4>
												<p>Published: {saved.date}</p>

												<button
												value = {saved._id} 
												className = "btn btn-default"
												onClick = {this.deleteArticle}>
												Delete
												</button>
											</div>
										);
									}.bind(this))
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