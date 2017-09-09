/*
================== ROUTES FOR NYTREACT ==================
*/

// DEPENDENCIES 
// ==================

// React library
var React = require("react");

// react-router module
var router = require("react-router");

// Route component for displaying individual routes
var Route = router.Route;

// Router component to contain all our Routes
// pass in some configuration as props
var Router = router.Router;

// include the hashHistory prop to handle routing client side
// without a server
var hashHistory = router.hashHistory;

// include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// reference the high-level components
var Main = require("../components/Main");
var Search = require("../components/Search");
// var Saved = require("../components/Saved");

// ROUTES
// ==================

// export the routes
module.exports = (

	// the high level component is the Router component
	<Router history={hashHistory}>

		<Route path="/" component={Main}>
		
			<Route path="search" component={Search}/>

			{/* default route */}
			<IndexRoute component={Search}/>

		</Route>

	</Router>

);

			//<Route path="saved" component={Saved}/>

