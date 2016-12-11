$(document).ready(function () {
	var announceId = getParameterByName('announceId');
	loadData(announceId);
	
	$('#btnSave').click(function(){
		if($('#subject').val()!="")
			saveData(announceId);
		else
			alert("กรุณาใส่ชื่อประกาศ");
	})
});
	function loadData(announceId){
		$('.modal').show();
		$.ajax({
			type : "GET",
			url: "http://localhost:8080/Announce/loadAnnounceById/"+announceId,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				console.log(JSON.stringify(data));
				$('#subject').val(data.announceSubject);
				$('#image').val(data.announceImage);
				$('#group').val(data.announceGroup);
				var bbcode = $("textarea").sceditor('instance').toBBCode(data.announceDetail);
				$('textarea').sceditor('instance').insert(bbcode);
				$('.modal').hide();
				
			},
			failure: function(errMsg) {
				$('.modal').hide();
				alert(errMsg);
			}
		});
			
	}
	
	function saveData(announceId){
		$('.modal').show();
		
		var html = $("textarea").sceditor('instance').fromBBCode($('#detail').val());
		
		var postData = {
			announceId : announceId,
			announceSubject : $('#subject').val(),
			announceImage: $('#image').val(),
			announceDetail: html,
			announceGroup: $('#group').val()
		};		
		
		$.ajax({
			type : "POST",
			url: "http://localhost:8080/Announce/updateAnnounce",
			data : JSON.stringify(postData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				window.location.href = "index.html";
			},
			failure: function(errMsg) {
				alert(errMsg);
			}
		});
		$('.modal').hide();
		
		
		
		
		
	}
	
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
