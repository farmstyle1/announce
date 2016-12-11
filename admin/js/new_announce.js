$(document).ready(function () {
	
});
	
	$('#btnSave').click(function(){
		if($('#subject').val()!="")
			saveData();
		else
			alert("กรุณาใส่ชื่อประกาศ");
	})
	
	function saveData(){
		$('.modal').show();
		
		var html = $("textarea").sceditor('instance').fromBBCode($('#detail').val());
		
		var postData = {
			announceSubject : $('#subject').val(),
			announceImage: $('#image').val(),
			announceDetail: html,
			announceGroup: $('#group').val()
		};		
		
		$.ajax({
			type : "POST",
			url: "http://localhost:8080/Announce/saveAnnounce",
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
	

	

