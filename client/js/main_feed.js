$(document).ready(function () {
	loadData();
	

	
});
	
	function loadData(){
		$('.modal').show();
		$.ajax({
			type : "GET",
			url: "http://localhost:8080/Announce/loadAnnounceByClientId/aaaa",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				$.each(data.announceListBean, function(key, value) {  	
					var row = "<div class='desc'>";
					row = row + "<div class='thumb'>";
					row = row + "<img class='img-circle' src='"+value.announceImage+"' width='35px' height='35px' align=''>";
					row = row + "</div>";
					row = row + "<div class='details'>";
					row = row + "<p><a href='#'>"+value.announceSubject+"</a><br/>";
					row = row + ""+value.announceDetail+"</br>";
					row = row + "<muted>From</muted>";
					row = row + "</p>";
					row = row + "</div>";
					row = row + "</div>";		
					$('#Content').append(row);
					$('.modal').hide();
				});	
			},
			failure: function(errMsg) {
				alert(errMsg);
				
			}
		});
		
	}


