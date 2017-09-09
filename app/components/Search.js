/*
	================== SEARCH COMPONENT ==================
*/

// DEPENDENCIES
// ==================

var React = require("react");
var helpers = require("./utils/helpers.js");

// children components
var Queries = require("./Queries.js");
var Results = require("./Results.js");

// SEARCH COMPONENT
// ==================

var Search = React.createClass({
	
	// get initial state
	getInitialState: function(){
		return {
			// query search terms
			topic: "",
			startYear: "",
			endYear: "", 
			// articles searched for
			articles:[]
		}

		// bind to the component
		this.newSearch = this.newSearch.bind(this);
		this.newArticle = this.newArticle.bind(this);
	},

	// function for updating the search terms
	// give Queries access to this function (child-to-parent updating)
	newSearch: function(newTopic, newSYear, newEYear){
		this.setState({
			topic: newTopic,
			startYear: newSYear,
			endYear: newEYear
		});
	},

	// function to save new article to the database
	newArticle: function(event){

		var index = event.target.value;

		// save article to the database using helper function
		helpers.saveArticle(this.state.articles[index]).then(function(response){
			
			if (response.data.alreadySaved) {
				alert('You\'ve already  saved the article!');
			}
			else {
				var currentArticles = this.state.articles;

				// remove article from articles
				currentArticles.splice(index,1);

				this.setState({
					articles: currentArticles
				});
			}
			

		}.bind(this));
	},

	// lifecycle  event which runs whenever a new search has been done
	componentDidUpdate: function(prevProps, prevState){
		
		if (prevState.topic !== this.state.topic || prevState.startYear !== this.state.startYear || prevState.endYear !== this.state.endYear) {
			// if the search queries have been updated in any way

			// run a new NYT article search
			helpers.searchNYT(this.state.topic, this.state.startYear, this.state.endYear).then(function(response){

				// if the articles are new, set to new articles
				if (response !== this.state.articles) {	
					this.setState({
						articles:response
					});
				}

			}.bind(this));

		}

	},

	render: function(){

		// conditional rendering to display queries / results

		if (this.state.articles.length !== 0){
		// if there are any articles yet, show Queries + Results
			return(

				<div>
					<div className="container" id="queries-and-results-div">

						<Queries 	
							newSearch = {this.newSearch}
						/>

						<Results
							articles = {this.state.articles} 
							newArticle = {this.newArticle}
						/> 

					</div>
				</div>

			);
		}

		// else show only Queries
		return(
				<div>
					<div className="container" id="queries-div">
						<Queries
							newSearch = {this.newSearch}
						/>
					</div>
				</div>
		);
	}
});

module.exports = Search;