$(document).ready(function () {
	$('.modal').show();
	var config = {
		apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
		authDomain: "project-3194512744625347804.firebaseapp.com",
		databaseURL: "https://project-3194512744625347804.firebaseio.com",
		storageBucket: "project-3194512744625347804.appspot.com",
	};
	firebase.initializeApp(config);
	
	var database = firebase.database();	
	var starCountRef = firebase.database().ref().child('user-posts').child('journal_item').child('item_list');
	starCountRef.on('value', function(snapshot) {
		$('#Content').empty();
		if(snapshot.val()==null){
			$('.modal').hide();
		}else{
			$.each(snapshot.val(), function(key, value) {  		
				var row = "<div class='desc'>";
				row = row + "<div class='thumb'>";
				row = row + "<img class='img-circle' src='"+value.imgUrl+"' width='35px' height='35px' align=''>";
				row = row + "</div>";
				row = row + "<div class='details'>";
				row = row + "<p><a href='issue.html?key="+value.key+"'>"+value.id+"</a><br/>";
				row = row + "<muted>"+value.description+"</muted>";
				row = row + "</p>";
				row = row + "</div>";
				row = row + "<div class='pull-right' >";
				row = row + "<button type='button' class='btn btn-danger btnDeleteIssue' key='"+value.key+"' style='margin-right: 15px;'>ลบ</button></i></button>";
				row = row + "<a href='edit_journal.html?key="+value.key+"'><button type='button' class='btn btn-warning' style='margin-right: 15px;'>แก้ไข</button></i></button></a>";
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
			
			//Delete Image
			var starCountRefImage = firebase.database().ref().child('user-posts').child('journal_image').child(keyJournal).child('article');
		
			starCountRefImage.on('value', function(snapshot) {
				if(snapshot.val()==null){
					
				}else{
					
					$.each(snapshot.val(), function(key, value) {  	
						
						$.each(value.image, function(key, image) {  	
							
							// Delete the file
							var storage = firebase.storage();
							var storageRef = storage.ref();
							var desertRef = storageRef.child("images/"+image.key_article+'/'+image.img);
							desertRef.delete().then(function() {
								
							}).catch(function(error) {
								console.log(error);
							});
						});	
					});	
					
					// Delete Journal Image DB
					firebase.database().ref('user-posts/journal_image/' + keyJournal).remove().then(function() {
						
					}).catch(function(error) {
					  
					});
					
					
					
					
				}
			});
			
			//Delete Pdf
			var starCountRefPdf = firebase.database().ref().child('user-posts').child('journal_pdf').child(keyJournal).child('article');
		
			starCountRefPdf.on('value', function(snapshot) {
				if(snapshot.val()==null){
					
				}else{
					
					$.each(snapshot.val(), function(key, value) {  	
						
						$.each(value.pdf, function(key, pdf) {  	
							
							// Delete the file
							var storage = firebase.storage();
							var storageRef = storage.ref();
							var desertRef = storageRef.child("pdf/"+pdf.pdf);
							desertRef.delete().then(function() {
								
							}).catch(function(error) {
								console.log(error);
							});
						});	
					});	
					
					// Delete Journal Image DB
					firebase.database().ref('user-posts/journal_pdf/' + keyJournal).remove().then(function() {
						
					}).catch(function(error) {
					  
					});
					
					
					
					
				}
			});
			
			// Delete Journal Item DB
			firebase.database().ref('user-posts/journal_item/item_list/' + keyJournal).remove().then(function() {
	
			}).catch(function(error) {
			  console.log("error");
			});
			
			// Delete Image of Journal 
			var storage = firebase.storage();
			var storageRef = storage.ref();
			var desertRef = storageRef.child("images/"+keyJournal);
			desertRef.delete().then(function() {
				$('.modal').hide();
			}).catch(function(error) {
				console.log(error);
			});
					
					
		}
  	});
	
	
});


