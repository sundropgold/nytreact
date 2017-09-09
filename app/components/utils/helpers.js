/*
	================== HELPERS ==================
*/

// DEPENDENCIES
// ======================================================

// use axios to perform GET/POST requests
var axios = require("axios");

// HELPERS
// ======================================================

// export an object 
module.exports = {

	/* ================== ARTICLES ================== */
	
	// query db for saved articles
	getSavedArticles: function(){
		return axios.get("/get-saved").then(function(response){

			return response.data;
		});
	},
	// save an article to the database
	saveArticle: function(article){

		var article = {
				title:article.headline.main,
				url:article.web_url,
				date:article.pub_date

			};

		return axios.post("/save");
	},
	// delete saved article in the database
	deleteSavedArticle:function(id){
		return axios.delete("/delete/" + id);
	},

	/* ================== SEARCH ================== */

	// run nyt ajax call search here
	searchNYT:function(searchTopic, searchSYear, searchEYear){

		// custom headers
		var authKey = "734c8e1dc5fe4b7fb1d6ee0e056e4221";
		var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${authKey}
			&q=${searchTopic}`;
		
		if (searchSYear) {
			// if there's a start year
			url += `&start_date=${searchSYear}0101`;
		}

		if (searchEYear) {
			// if there's an end year
			url += `&end_date=${searchEYear}0101`;
		}


		return axios.get(url).then(function(res){
			
			console.log(res);

			var limit = 5;
			var newArticles = [];
			var newData = res.data.response.docs;

			for (var i = 0; i < limit; i++) {

				// add new articles into newArticles array
				newArticles.push(newData[i]);
			}

			return newArticles;

		});
	}
};