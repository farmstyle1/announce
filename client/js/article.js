$(document).ready(function () {
	var key = getParameterByName('key');
	var keyArticle = getParameterByName('keyArticle');
	
	var config = {
		apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
		authDomain: "project-3194512744625347804.firebaseapp.com",
		databaseURL: "https://project-3194512744625347804.firebaseio.com",
		storageBucket: "project-3194512744625347804.appspot.com",
	};
	firebase.initializeApp(config);
	
	var database = firebase.database();	
	var starCountRef = firebase.database().ref().child('user-posts').child('journal_item').child('item_list').child(key).child('article').child('article_list').child(keyArticle);
	starCountRef.on('value', function(snapshot) {
	
		
			$("#article").html(snapshot.val().article);
		
	});
	
	
});

// Get Parameter From Get Function
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
	}


