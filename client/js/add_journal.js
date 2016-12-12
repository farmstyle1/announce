$(document).ready(function () {
	
	// Date Picker
	$("#datepicker").datepicker({dateFormat: 'dd/mm/yy'});
 
	// Save Data To FireBase
	$('#btnSave').addClass("loading"); 
		
		var config = {
			apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
			authDomain: "project-3194512744625347804.firebaseapp.com",
			databaseURL: "https://project-3194512744625347804.firebaseio.com",
			storageBucket: "project-3194512744625347804.appspot.com",
		};
		firebase.initializeApp(config);
		
		
		
		$('#btnSave').click(function() {
			if(confirm("ต้องการบันทึกข้อมูลหรือไม่")){
				if( $('#Id').val() != "" && $('#Vol').val() != "" && $('#No').val() != "" && $('#Month').val() != "" && $('#Year').val() != "" && $('#myFile').val() != ""){
					$('.modal').show();
					uploadImage();
				}else{
					alert("ใส่ข้อมูลให้ครบถ้วน");
				}
			}
		});
		

		$('#myFile').change(function(){
			
			var file = this.files[0];
			var name = file.name;
			var size = file.size;
			var type = file.type;
			//Your validation

			$('#myFileText').text(name);
			
		});
	
//**********************************************************************************************************************************************************
//	Upload File
//*********************************************************************************************************************************************************** -->
	
	function uploadImage(){
		var newPostKey = firebase.database().ref().child('posts').push().key;
		var file = $('#myFile')[0].files[0];
		var name = file.name;
		var size = file.size;
		var type = file.type;
		

		var storage = firebase.storage();
		var storageRef = storage.ref();
		
		var uploadTask = storageRef.child('images/' + newPostKey).put(file);

		uploadTask.on('state_changed', function(snapshot){
		 
		}, function(error) {
		
		}, function() {
		
		  var downloadURL = uploadTask.snapshot.downloadURL;
		
		
			if(downloadURL != ""){
				
				
				var postData = {
					key : newPostKey,
					id : $('#Id').val(),
					day: $('#Day').val(),
					date: $('#Date').val(),
					month: $('#Month').val(),
					year: $('#Year').val(),
					imgUrl: downloadURL,
					description: "Vol. "+$('#Vol').val()+" No. "+$('#No').val()
				};			
				
				var updates = {};
				updates['user-posts/journal_item/item_list/' + newPostKey] = postData;
				firebase.database().ref().update(updates).then(function() {
					$('.modal').hide();
					alert("บันทึกข้อมูลเสร็จสิ้น")
					window.location.href = "index.html";
				}).catch(function(error) {
				  console.log("error");
				});
				
				
			}
			
		});
		
		
	
		
	};
//**********************************************************************************************************************************************************
//	End Upload File
//*********************************************************************************************************************************************************** -->
	
});


