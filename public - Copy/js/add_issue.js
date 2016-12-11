$(document).ready(function () {
	
	var keyParameter = getParameterByName('key');
	
	var config = {
			apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
			authDomain: "project-3194512744625347804.firebaseapp.com",
			databaseURL: "https://project-3194512744625347804.firebaseio.com",
			storageBucket: "project-3194512744625347804.appspot.com",
		};
		firebase.initializeApp(config);
		
	var keyArticle = firebase.database().ref().child('posts').push().key;	
	
	

	$('#btnSave').click(function(){
		$('.modal').show();
		uploadData(keyParameter,keyArticle);
	})
	

		
	$('#myFile').change(function(){	
		uploadImage(keyParameter,keyArticle);
	});	
	
	$('#myFilePdf').change(function(){
		
		uploadPdf(keyParameter,keyArticle);	
		
			
	});

});
	
	function uploadPdf(keyParameter,keyArticle){
			
		var ext = $('#myFilePdf').val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['pdf']) == -1) {
			alert('ไม่ใช่ไฟล์ PDF');
		}else{
			
			$('.modal').show();
			var file = $('#myFilePdf')[0].files[0];
			var name = file.name;
			var size = file.size;
			var type = file.type;
		
			var storage = firebase.storage();
			var storageRef = storage.ref();
			var uploadTask = storageRef.child('pdf/'+ keyArticle).put(file);

			uploadTask.on('state_changed', function(snapshot){
			 
			}, function(error) {
			
			}, function() {
			
			  var downloadURL = uploadTask.snapshot.downloadURL;
			
			
				if(downloadURL != ""){
					
					var row = "<div >";
					row = row + "<div style='display:inline-block; margin-right:10px;'>";
					row = row +"<span>"+name+"</span>";
					row = row + "</div>";
					row = row + "<div style='display:inline-block;'>";
					row = row + "<button type='button' class='btn btn-danger btnDeletePdf' key='"+keyParameter+"' keyArticle='"+keyArticle+"'>ลบ</button>";
					row = row + "</div>";
					row = row + "<br><br>";
					row = row + "</div>";
					$('#add-pdf').append(row);				
					$('.modal').hide();
					$('#myFilePdf').val("");
					
					// Add keyImage to Jorunal Image	
					var postDataPdf = {
						pdf : keyArticle,
						pdfName : name,
						url : downloadURL
						
					};
					var update_pdf = {};
					update_pdf['user-posts/journal_pdf/' + keyParameter + '/article/' + keyArticle +'/pdf/'+keyArticle ]=postDataPdf;
					firebase.database().ref().update(update_pdf).then(function() {
						
					}).catch(function(error) {
					  console.log("error");
					});
							
					}
				
			});
		}
			
	}
	
	$(document).on('click', '.btnDeletePdf', function(e) {
		$('.modal').show();
		var storage = firebase.storage();
		var storageRef = storage.ref();
		var desertRef = storageRef.child("pdf/"+$(this).attr('keyArticle'));
		
		// Delete the file
		desertRef.delete().then(function() {
			$('.modal').hide();
			$('#myFilePdf').val("");
			
		}).catch(function(error) {
		// Uh-oh, an error occurred!
		});
		
		
		// Delete name of image out of list image
		firebase.database().ref('user-posts/journal_pdf/' + $(this).attr('key') + '/article/' + $(this).attr('keyArticle')+'/pdf/'+$(this).attr('keyArticle')).remove().then(function() {
		
		}).catch(function(error) {
		  console.log("error");
		});
		
		
		$(this).parent().parent().remove();
  	});
	

	function uploadImage(keyParameter,keyArticle){
		$('.modal').show();
		var d = new Date();
		var n = d.getTime();
		var newPostKey = firebase.database().ref().child('posts').push().key;
		var file = $('#myFile')[0].files[0];
		var name = file.name;
		var size = file.size;
		var type = file.type;
		

		var storage = firebase.storage();
		var storageRef = storage.ref();
		
		var uploadTask = storageRef.child('images/'+keyArticle+'/' + newPostKey).put(file);

		uploadTask.on('state_changed', function(snapshot){
		 
		}, function(error) {
		
		}, function() {
		
		  var downloadURL = uploadTask.snapshot.downloadURL;
		
		
			if(downloadURL != ""){
				
				var row = "<div>";
				row = row + "<div class='col-sm-6'>";
				row = row +"<input type='text' class='form-control' id='myFileText' value='"+downloadURL+"'>";
				row = row + "</div>";
				row = row + "<div class='col-sm-2'>";
				row = row + "<button type='button' class='btn btn-danger btnDeleteImage' key='"+keyParameter+"' keyArticle='"+keyArticle+"' url='"+newPostKey+"'>ลบ</button>";
				row = row + "</div>";
				row = row + "<br><br>";
				row = row + "</div>";
				$('#add-image').append(row);	
				$('.modal').hide();
				$('#myFile').val("");
				
				
					
				// Add keyImage to Jorunal Image	
				var postDataImage = {
					img : newPostKey,
					key_article : keyArticle
				};
				var update_image = {};
				update_image['user-posts/journal_image/' + keyParameter + '/article/' + keyArticle +'/image/'+newPostKey ]=postDataImage;
				firebase.database().ref().update(update_image).then(function() {
					
				}).catch(function(error) {
				  console.log("error");
				});
						
			}
			
		});
		
		
	};
	
	function uploadData(keyParameter,keyArticle){
		
		var html = $("textarea").sceditor('instance').fromBBCode($('#Article').val());
			
		var postData = {
			key: keyArticle,
			articleNameEng : $('#NameArticleEng').val(),
			articleNameTh: $('#NameArticleTh').val(),
			authorEng: $('#AuthorEng').val(),
			authorTh: $('#AuthorTh').val(),
			article: html
		
		};
		var updates = {};
		
		updates['user-posts/journal_item/item_list/' + keyParameter + '/article/article_list/' + keyArticle ] = postData;
		firebase.database().ref().update(updates).then(function() {
			$('.modal').hide();
			alert("บันทึกข้อมูลเสร็จสิ้น")
			window.location.href = "issue.html?key="+keyParameter;
		}).catch(function(error) {
		  console.log("error");
		});
		
		
	}
	
	$(document).on('click', '.btnDeleteImage', function(e) {
		$('.modal').show();
		var storage = firebase.storage();
		var storageRef = storage.ref();
		var desertRef = storageRef.child("images/"+$(this).attr('keyArticle')+"/"+$(this).attr('url'));
		
		// Delete the file
		desertRef.delete().then(function() {
			$('.modal').hide();
			$('#myFile').val("");
			
		}).catch(function(error) {
		// Uh-oh, an error occurred!
		});
		
		
		// Delete name of image out of list image
		firebase.database().ref('user-posts/journal_image/' + $(this).attr('key') + '/article/' + $(this).attr('keyArticle')+'/image/'+$(this).attr('url')).remove().then(function() {
		
		}).catch(function(error) {
		  console.log("error");
		});
		
		
		$(this).parent().parent().remove();
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
