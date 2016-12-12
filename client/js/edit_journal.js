$(document).ready(function () {
	var keyJournal = getParameterByName('key');
	
	var config = {
		apiKey: "AIzaSyC7hitC3Sza91gLffnI0DzfK5zVvkVtlvY",
		authDomain: "project-3194512744625347804.firebaseapp.com",
		databaseURL: "https://project-3194512744625347804.firebaseio.com",
		storageBucket: "project-3194512744625347804.appspot.com",
	};
	firebase.initializeApp(config);
	
	loadData(keyJournal);
	
	$('#btnSave').click(function() {
		if(confirm("ต้องการบันทึกข้อมูลหรือไม่")){
			if( $('#Id').val() != "" && $('#Vol').val() != "" && $('#No').val() != "" && $('#Date').val() != "" && $('#Month').val() != "" && $('#Year').val() != "" ){
				$('.modal').show();
				uploadImage(keyJournal);
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
	
	
	
	
	
});

	function loadData(keyJournal){
		$('.modal').show();
		var starCountRef = firebase.database().ref().child('user-posts').child('journal_item').child('item_list').child(keyJournal);
		starCountRef.on('value', function(snapshot) {
			console.log(JSON.stringify(snapshot.val()));
			$('#Id').val(snapshot.val().id);
			var description = snapshot.val().description.split(' ');
			$('#Vol').val(description[1])
			$('#No').val(description[3])
			$('#Day').val(snapshot.val().day);
			$('#Date').val(snapshot.val().date);
			$('#Month').val(snapshot.val().month);
			$('#Year').val(snapshot.val().year);
			$('#ImageCover').attr('src',snapshot.val().imgUrl);
			$('.modal').hide();

		});
	}
		
	function uploadImage(keyJournal){
		
		if($('#myFile').val() != ""){
			var file = $('#myFile')[0].files[0];
			var name = file.name;
			var size = file.size;
			var type = file.type;
			

			var storage = firebase.storage();
			var storageRef = storage.ref();
			
			var uploadTask = storageRef.child('images/' + keyJournal).put(file);

			uploadTask.on('state_changed', function(snapshot){
			 
			}, function(error) {
			
			}, function() {
			
			  var downloadURL = uploadTask.snapshot.downloadURL;
			
			
				if(downloadURL != ""){
					
					
					var postData = {
						key : keyJournal,
						id : $('#Id').val(),
						day: $('#Day').val(),
						date: $('#Date').val(),
						month: $('#Month').val(),
						year: $('#Year').val(),
						imgUrl: downloadURL,
						description: "Vol. "+$('#Vol').val()+" No. "+$('#No').val()
					};			
					
					var updates = {};
					updates['user-posts/journal_item/item_list/' + keyJournal] = postData;
					firebase.database().ref().update(updates).then(function() {
						$('.modal').hide();
						alert("บันทึกข้อมูลเสร็จสิ้น")
						window.location.href = "index.html";
					}).catch(function(error) {
					  console.log("error");
					});
					
					
				}
				
			});
			
		}else{
			var postData = {
				key : keyJournal,
				id : $('#Id').val(),
				day: $('#Day').val(),
				date: $('#Date').val(),
				month: $('#Month').val(),
				year: $('#Year').val(),
				imgUrl: $('#ImageCover').attr('src'),
				description: "Vol. "+$('#Vol').val()+" No. "+$('#No').val()
			};			
			
			var updates = {};
			updates['user-posts/journal_item/item_list/' + keyJournal] = postData;
			firebase.database().ref().update(updates).then(function() {
				$('.modal').hide();
				alert("บันทึกข้อมูลเสร็จสิ้น")
				window.location.href = "index.html";
			}).catch(function(error) {
			  console.log("error");
			});
		}
		
		
		
	
		
	};
	
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

