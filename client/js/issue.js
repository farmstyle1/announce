$(document).ready(function () {
	
	$('.modal').show();
	var keyJournal = getParameterByName('key');
	$('#link').html("<ul class='nav pull-right top-menu'><li><a class='logout' href='add_issue.html?key="+keyJournal+"'>เพิ่มนิพนธ์</a></li></ul>");
	
	var config = {
		apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
		authDomain: "project-3194512744625347804.firebaseapp.com",
		databaseURL: "https://project-3194512744625347804.firebaseio.com",
		storageBucket: "project-3194512744625347804.appspot.com",
	};
	firebase.initializeApp(config);
	
	var database = firebase.database();
	
	
	
	var starCountRef = firebase.database().ref().child('user-posts').child('journal_item').child('item_list').child(keyJournal).child('article').child('article_list');
	
	starCountRef.on('value', function(snapshot) {
		$('#Content').empty();
		if(snapshot.val()==null){
			$('.modal').hide();
		}else{
			$.each(snapshot.val(), function(key, value) {  	
				
				var row = "<div class='desc' style='padding-right: 15px;'>";
				row = row + "<div class='thumb'>";
				row = row + "<img class='img-circle' src='' width='35px' height='35px' align=''>";
				row = row + "</div>";
				row = row + "<div class='details'>";
				row = row + "<p><a href='article.html?key="+keyJournal+"&keyArticle="+value.key+"'>"+value.articleNameEng+"</a><br/>";
				row = row + "<muted>"+value.authorEng+"</muted>";
				row = row + "</p>";
				row = row + "</div>";
				row = row + "<div class='pull-right' >";
				row = row + "<button type='button' class='btn btn-danger btnDeleteIssue' key='"+keyJournal+"' keyArticle='"+value.key+"' style='margin-right: 15px;'>ลบ</button></i></button>";
				row = row + "<a href='edit_issue.html?key="+keyJournal+"&keyArticle="+value.key+"'><button type='button' class='btn btn-warning'>แก้ไข</button></i></button></a>";
				row = row + "</div>";
				row = row + "</div>";		
				$('#Content').append(row);
			});	
			$('.modal').hide();
		}
		
	});
	
	$(document).on('click', '.btnDeleteIssue', function(e) {
		if(confirm("ต้องการลบข้อมูลหรือไม่")){
			$('.modal').show();
			var keyJournal = $(this).attr('key');
			var keyArticle = $(this).attr('keyArticle');
			
			firebase.database().ref('user-posts/journal_item/item_list/' + $(this).attr('key') + '/article/article_list/' + keyArticle).remove().then(function() {
			
			}).catch(function(error) {
			  console.log("error");
			});
			
			
			
			// Delete Image
			var starCountRefImage = firebase.database().ref().child('user-posts').child('journal_image').child(keyJournal).child('article').child(keyArticle);
		
			starCountRefImage.on('value', function(snapshot) {
				if(snapshot.val()==null){
					$('.modal').hide();
				}else{
					//console.log(JSON.stringify(snapshot.val()));
					$.each(snapshot.val().image, function(key, value) {  	
							
						// Delete the file
						var storage = firebase.storage();
						var storageRef = storage.ref();
						var desertRef = storageRef.child("images/"+keyArticle+'/'+value.img);
						desertRef.delete().then(function() {
							
						}).catch(function(error) {
						
						});
						
					});	
					
					firebase.database().ref('user-posts/journal_image/' + keyJournal + '/article/' + keyArticle).remove().then(function() {
			
					}).catch(function(error) {
					  console.log("error");
					});
					
					
			
					$('.modal').hide();
				}
			});
			
			// Delete PDF
			var storage = firebase.storage();
			var storageRef = storage.ref();
			var desertRef = storageRef.child("pdf/"+keyArticle);
			desertRef.delete().then(function() {
				firebase.database().ref('user-posts/journal_pdf/' + keyJournal + '/article/' + keyArticle).remove().then(function() {
			
				}).catch(function(error) {
				  console.log("error");
				});
			}).catch(function(error) {
			
			});
						
			
			
			
			
			$(this).parent().parent().remove();
		}
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
