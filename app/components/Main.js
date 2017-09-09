/*
	================== MAIN COMPONENT ==================
*/

// DEPENDENCIES
// ==================

var React = require("react");

// including the Link component from React Router to navigate within our application without full page
var Link = require("react-router").Link;

// MAIN COMPONENT
// ==================

var Main = React.createClass({

	// render the component here
	render: function(){
		
		return(
			<div>
				<div className="container" id="main-div">
					
					{/* jumbotron */}
					<div className="jumbotron">
						<h1>New York Times Article Scraper</h1>
						<p>search for and save your favorite articles!</p>

						{/* link to search (and queries + results within search) */}
						<Link to="/search">
							<button className="btn btn-default">Article Search</button>
						</Link>

						{/* link to saved */}
						<Link to="/saved">
							<button className="btn btn-default">Saved Articles</button>
						</Link>	

					</div>

				</div>

				<div className="container">
					{/* place the child components here */}
					{this.props.children}
				</div>
			</div>
		);

	}
});

// export the component
module.exports = Main;
		